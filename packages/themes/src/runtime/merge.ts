import type { CraftOverride, Crafts, ThemeProps } from './types'
import { crafts as defaultCrafts } from '../default'
import { clsx, tv } from '../utils'

/** tv() config keys that trigger a craft extend */
const TV_CONFIG_KEYS = [
  'base',
  'variants',
  'defaultVariants',
  'compoundVariants',
  'compoundSlots',
] as const

const DEFAULT_THEME_REST: Required<
  Pick<ThemeProps, 'skin' | 'surface' | 'size' | 'unstyled' | 'bordered'>
> = {
  skin: 'default',
  surface: 'dark',
  size: 'base',
  unstyled: false,
  bordered: true,
}

/**
 * Cache resolved craft overrides.
 * Keyed by override object identity → craftKey → { baseCraft, resolved }.
 * Invalidates when the base craft function identity changes (e.g. after config merge).
 */
const craftOverrideCache = new WeakMap<object, Map<string, { base: unknown, resolved: unknown }>>()

export function pickDefined<T extends Record<string, any>>(obj?: T): Partial<T> {
  if (!obj)
    return {} as Partial<T>
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>
}

function isNil(value: unknown): value is null | undefined {
  return value == null
}

/** Drop `null` / `undefined` entries from a plain theme / theme-config object. */
export function cleanThemeProps<T extends ThemeProps>(obj: T | undefined): Partial<T> {
  if (!obj)
    return {}
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => !isNil(value)),
  ) as Partial<T>
}

export function mergeThemeRest(
  ...layers: Array<Partial<ThemeProps>>
): ThemeProps {
  return Object.assign({}, DEFAULT_THEME_REST, ...layers)
}

export function mergeCraftTables(
  ...layers: Array<Partial<Crafts> | undefined>
): Crafts {
  return Object.assign({}, defaultCrafts, ...layers.map(layer => pickDefined(layer))) as Crafts
}

/**
 * Resolve a CraftOverride into a single craft function for `craftKey`.
 * Handles: slots, defaultVariants, and full tv() config (base, variants, …).
 * Results are cached per (override object, craftKey, baseCraft).
 */
export function resolveCraftOverride<K extends keyof Crafts>(
  craftKey: K,
  override: CraftOverride<NoInfer<K>> | undefined,
  baseCraft: Crafts[K],
): Crafts[K] {
  if (!override)
    return baseCraft

  const cached = craftOverrideCache.get(override)?.get(craftKey as string)
  if (cached && cached.base === baseCraft)
    return cached.resolved as Crafts[K]

  const resolved = buildCraftOverride(override, baseCraft)

  let byKey = craftOverrideCache.get(override)
  if (!byKey) {
    byKey = new Map()
    craftOverrideCache.set(override, byKey)
  }
  byKey.set(craftKey as string, { base: baseCraft, resolved })

  return resolved as Crafts[K]
}

function buildCraftOverride(
  override: CraftOverride<any>,
  baseCraft: Crafts[keyof Crafts],
): Crafts[keyof Crafts] {
  let craft = baseCraft

  const hasTvConfig = TV_CONFIG_KEYS.some(k => (override as any)[k] !== undefined)
  if (hasTvConfig) {
    const tvConfig: Record<string, any> = { extend: craft }
    for (const k of TV_CONFIG_KEYS) {
      if ((override as any)[k] !== undefined)
        tvConfig[k] = (override as any)[k]
    }
    craft = tv(tvConfig as any) as any
  }

  const overrideSlots = override.slots as Record<string, any> | undefined
  const overrideDefaults = override.defaultVariants as Record<string, any> | undefined
  if (!overrideSlots && !overrideDefaults)
    return craft

  const originalFn = craft as (...args: any[]) => any
  const wrappedCraft = (...args: any[]) => {
    const result = originalFn(...args)

    if (typeof result === 'string')
      return result

    const wrapped: Record<string, any> = {}
    for (const slotKey of Object.keys(result)) {
      const originalSlotFn = result[slotKey]
      if (typeof originalSlotFn !== 'function') {
        wrapped[slotKey] = originalSlotFn
        continue
      }
      wrapped[slotKey] = (props: any = {}) => {
        const extraClass = overrideSlots?.[slotKey]
        const mergedProps = overrideDefaults
          ? { ...overrideDefaults, ...props }
          : props

        if (extraClass)
          mergedProps.class = clsx(mergedProps.class, extraClass)

        return originalSlotFn(mergedProps)
      }
    }
    return wrapped
  }

  return wrappedCraft as Crafts[keyof Crafts]
}

/**
 * Patch a single craft key on a crafts table (used when baking overrides into
 * a provided theme for descendant craft consumers).
 */
export function patchCraftTable<K extends keyof Crafts>(
  table: Crafts,
  craftKey: K,
  override: CraftOverride<NoInfer<K>> | undefined,
): Crafts {
  if (!override)
    return table

  const base = table[craftKey]
  if (!base)
    return table

  return {
    ...table,
    [craftKey]: resolveCraftOverride(craftKey, override, base),
  } as Crafts
}
