import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { CraftOverride, Crafts, ThemeProps } from '../providers/theme/theme-props'
import { crafts } from '@raxium/themes/default'
import { clsx, tv } from '@raxium/themes/utils'
import { omitBy } from 'es-toolkit'
import { isNil, keysIn } from 'es-toolkit/compat'
import { computed, getCurrentInstance, toValue } from 'vue'
import { injectScopeTheme } from '../providers/theme/theme-props'
import { useConfig } from './useConfig'
import { usePreferredColorScheme } from './usePreferredColorScheme'

type UseThemeReturn = ComputedRef<Omit<ThemeProps, 'crafts'> & { crafts: Crafts }>

const CRAFTS_KEYS = keysIn(crafts)

function pickDefined<T extends Record<string, any>>(obj?: T) {
  if (!obj)
    return {} as Partial<T>
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>
}

function clean(obj: ComputedRef<ThemeProps | undefined>) {
  return omitBy(obj.value ?? {}, value => isNil(value))
}

/** tv() config keys that trigger a craft extend */
const TV_CONFIG_KEYS = ['base', 'variants', 'defaultVariants', 'compoundVariants', 'compoundSlots']

/**
 * Resolve a CraftOverride into a craft function that can replace the base craft.
 * Handles: class (root shortcut), slots (per-slot classes), defaultVariants,
 * and full tv() config (base, variants, compoundVariants, compoundSlots).
 */
function resolveCraftOverride(
  override: CraftOverride<any> | undefined,
  compName: string | undefined,
  baseCrafts: Crafts,
): Partial<Crafts> {
  if (!override || !compName)
    return {}

  const craftKey = `tv${compName}` as keyof Crafts
  if (!CRAFTS_KEYS.includes(craftKey))
    return {}

  let baseCraft = baseCrafts[craftKey]
  if (!baseCraft)
    return {}

  const overrideSlots = override.slots as Record<string, any> | undefined
  const overrideDefaults = override.defaultVariants as Record<string, any> | undefined

  // If tv() config keys are present, extend the base craft first
  const hasTvConfig = TV_CONFIG_KEYS.some(k => (override as any)[k] !== undefined)
  if (hasTvConfig) {
    const tvConfig: Record<string, any> = { extend: baseCraft }
    for (const k of TV_CONFIG_KEYS) {
      if ((override as any)[k] !== undefined)
        tvConfig[k] = (override as any)[k]
    }
    baseCraft = tv(tvConfig as any) as any
  }

  // If only tv config (no slots/defaults additions), return extended craft directly
  const hasClassOverrides = overrideSlots || overrideDefaults
  if (!hasClassOverrides)
    return { [craftKey]: baseCraft } as Partial<Crafts>

  // Wrap craft to inject slots/defaults at call time
  const originalFn = baseCraft as (...args: any[]) => any
  const wrappedCraft = (...args: any[]) => {
    const result = originalFn(...args)

    // Base-only craft: result is a string, no slot wrapping needed
    if (typeof result === 'string')
      return result

    // Slotted craft: result is { root: fn, slot: fn, ... }
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

  return { [craftKey]: wrappedCraft } as Partial<Crafts>
}

/**
 * Resolve and merge theme props from five levels:
 * Defaults → Global Config → Component Config → Scope Theme → Props.
 *
 * Intended for independent/root components (Tooltip, Popover, Dialog, etc.)
 * that define their own theming boundary and should react to Scope Theme.
 * Structural sub-components should prefer `useInheritedTheme()`.
 *
 * `skin` and `surface` are consumed exclusively by CSS custom variants via
 * data-attributes (`data-theme-skin`, `data-theme-surface`), NOT by tv() variants.
 * They are spread into craft calls only to maintain a uniform API surface; the
 * actual visual effect comes from CSS selectors defined in the theme preset.
 */
export function useTheme(): UseThemeReturn
export function useTheme<T = ThemeProps>(
  props?: MaybeRefOrGetter<Partial<T> | undefined>,
  componentConfig?: MaybeRefOrGetter<Partial<T> | undefined>,
  craftProp?: MaybeRefOrGetter<CraftOverride<any> | undefined>,
): UseThemeReturn
/**
 * @param props - Instance-level theme overrides from the component's `:theme` prop.
 *   Highest priority in the merge chain; wins over all lower layers.
 * @param componentConfig - Component-type defaults from `RUIConfig` (e.g.
 *   `RUIConfig.tooltip.theme`, `RUIConfig.dialog.theme`). Lower priority than
 *   ancestor `ThemeProvider` context so nested surfaces (Dialog, Popover, etc.)
 *   can override app-wide component defaults.
 * @param craftProp - Per-component craft override for the current component instance.
 *   Applied after theme props and crafts are merged; extends or wraps the resolved
 *   `tv*` craft for the calling component (identified via `__name` / `name`).
 * @returns A computed ref of the fully merged theme, including resolved `crafts`.
 */
export function useTheme<T>(
  props?: MaybeRefOrGetter<Partial<T> | undefined>,
  componentConfig?: MaybeRefOrGetter<Partial<T> | undefined>,
  craftProp?: MaybeRefOrGetter<CraftOverride<any> | undefined>,
): UseThemeReturn {
  const configTheme = useConfig('theme')
  const contextTheme = injectScopeTheme(computed(() => ({})))
  const componentConfigTheme = computed(() => toValue(componentConfig) ?? {})
  const propsTheme = computed(() => toValue(props) ?? {})
  const systemSurface = usePreferredColorScheme()

  const vm = getCurrentInstance()
  const compName = vm?.type.__name ?? vm?.type.name

  const merged = computed(() => {
    const { crafts: configCrafts, ...configRest } = clean(configTheme) as any
    const { crafts: componentCrafts, ...componentRest } = clean(componentConfigTheme) as any
    const { crafts: contextCrafts, ...contextRest } = clean(contextTheme) as any
    const propsRest = clean(propsTheme) as any

    const themeRest = Object.assign(
      {
        skin: 'default',
        surface: 'dark',
        size: 'base',
        unstyled: false,
        bordered: true,
      },
      configRest,
      componentRest,
      contextRest,
      propsRest,
    )

    // Resolve surface: 'system' → actual OS preference
    if (themeRest.surface === 'system')
      themeRest.surface = systemSurface.value

    // Crafts merge: base → global config → component config → context → craftProp
    const mergedCrafts: Crafts = Object.assign(
      {},
      crafts,
      pickDefined<Crafts>(configCrafts as Crafts | undefined),
      pickDefined<Crafts>(componentCrafts as Crafts | undefined),
      pickDefined<Crafts>(contextCrafts as Crafts | undefined),
    ) as Crafts

    // Apply per-component craft override (highest priority)
    const craftValue = toValue(craftProp)
    if (craftValue) {
      Object.assign(mergedCrafts, resolveCraftOverride(craftValue, compName, mergedCrafts))
    }

    const result = {
      ...themeRest,
      crafts: mergedCrafts,
    } as unknown as Omit<ThemeProps, 'crafts'> & { crafts: Crafts }

    // Dev-mode debug: track merge sources
    if (import.meta.env.DEV && vm?.proxy?.$el) {
      const sources: string[] = []
      if (configCrafts || Object.keys(configRest).length)
        sources.push('config')
      if (componentCrafts || Object.keys(componentRest).length)
        sources.push('component-config')
      if (contextCrafts || Object.keys(contextRest).length)
        sources.push('context')
      if (Object.keys(propsRest).length)
        sources.push('props')
      if (craftValue)
        sources.push('craft')

      try {
        const el = vm.proxy.$el as HTMLElement | undefined
        el?.setAttribute?.('data-rui-theme-source', sources.join(','))
      }
      catch {}
    }

    return result
  })

  return merged
}

export function useCustomTheme<T>(props?: MaybeRefOrGetter<T | undefined>): UseThemeReturn {
  return useTheme<T>(props ?? {})
}
