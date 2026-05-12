import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { Crafts, CraftShorthand, ThemeProps } from '../providers/theme/theme-props'
import { crafts } from '@raxium/themes/default'
import { clsx, tv } from '@raxium/themes/utils'
import { omitBy } from 'es-toolkit'
import { isNil, keysIn } from 'es-toolkit/compat'
import { computed, getCurrentInstance, toValue } from 'vue'
import { injectThemeContext } from '../providers/theme/theme-props'
import { useConfig } from './useConfig'

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

function resolvePropsCrafts(propsCrafts: unknown, compName: string | undefined): Partial<Crafts> {
  if (!propsCrafts)
    return {}
  if (typeof propsCrafts === 'function')
    return propsCrafts()
  if (Object.keys(propsCrafts as object).some(k => CRAFTS_KEYS.includes(k)))
    return pickDefined<Crafts>(propsCrafts as Crafts)
  if (compName && CRAFTS_KEYS.includes(`tv${compName}`)) {
    return {
      [`tv${compName}`]: tv({
        extend: crafts[`tv${compName}` as keyof typeof crafts],
        ...(propsCrafts as object),
      }),
    }
  }
  return {}
}

/**
 * Resolve a CraftShorthand into a craft override that can be merged into the crafts object.
 * Supports: class (root shortcut), slots (per-slot classes), defaults, extend.
 */
function resolveCraftShorthand(
  shorthand: CraftShorthand<any> | undefined,
  compName: string | undefined,
  baseCrafts: Crafts,
): Partial<Crafts> {
  if (!shorthand || !compName)
    return {}

  const craftKey = `tv${compName}` as keyof Crafts
  if (!CRAFTS_KEYS.includes(craftKey))
    return {}

  const baseCraft = baseCrafts[craftKey]
  if (!baseCraft)
    return {}

  const shorthandClass = shorthand.class as string | undefined
  const shorthandSlots = shorthand.slots as Record<string, any> | undefined
  const shorthandDefaults = shorthand.defaults as Record<string, any> | undefined
  const shorthandExtend = shorthand.extend as Record<string, any> | undefined

  function wrapCraft(craft: any) {
    const originalFn = craft as (...args: any[]) => any
    return (...args: any[]) => {
      const result = originalFn(...args)
      const wrapped: Record<string, any> = {}

      for (const slotKey of Object.keys(result)) {
        const originalSlotFn = result[slotKey]
        if (typeof originalSlotFn !== 'function') {
          wrapped[slotKey] = originalSlotFn
          continue
        }

        wrapped[slotKey] = (props: any = {}) => {
          const extraClass = slotKey === 'root'
            ? clsx(shorthandClass, shorthandSlots?.root)
            : shorthandSlots?.[slotKey]

          const mergedProps = shorthandDefaults
            ? { ...shorthandDefaults, ...props }
            : props

          if (extraClass) {
            mergedProps.class = clsx(mergedProps.class, extraClass)
          }

          return originalSlotFn(mergedProps)
        }
      }
      return wrapped
    }
  }

  // If extend is specified, create an extended craft first, then wrap
  if (shorthandExtend) {
    const extendedCraft = tv({
      extend: baseCraft as any,
      ...shorthandExtend,
    })
    return { [craftKey]: wrapCraft(extendedCraft) } as Partial<Crafts>
  }

  return { [craftKey]: wrapCraft(baseCraft) } as Partial<Crafts>
}

export function useTheme(): UseThemeReturn
export function useTheme<T = ThemeProps>(
  props?: MaybeRefOrGetter<Partial<T> | undefined>,
  craftProp?: MaybeRefOrGetter<CraftShorthand<any> | undefined>,
): UseThemeReturn
export function useTheme<T>(
  props?: MaybeRefOrGetter<Partial<T> | undefined>,
  craftProp?: MaybeRefOrGetter<CraftShorthand<any> | undefined>,
): UseThemeReturn {
  const configTheme = useConfig('theme')
  const contextTheme = injectThemeContext(computed(() => ({})))
  const propsTheme = computed(() => toValue(props) ?? {})

  const vm = getCurrentInstance()
  const compName = vm?.type.__name ?? vm?.type.name

  const merged = computed(() => {
    const { crafts: configCrafts, ...configRest } = clean(configTheme) as any
    const { crafts: contextCrafts, ...contextRest } = clean(contextTheme) as any
    const { crafts: propsCrafts, ...propsRest } = clean(propsTheme) as any

    const themeRest = Object.assign(
      {
        skin: 'default',
        surface: 'dark',
        size: 'base',
        unstyled: false,
        bordered: true,
      },
      configRest,
      contextRest,
      propsRest,
    )

    const mergedCrafts: Crafts = Object.assign(
      {},
      crafts,
      pickDefined<Crafts>(configCrafts as Crafts | undefined),
      pickDefined<Crafts>(contextCrafts as Crafts | undefined),
      resolvePropsCrafts(propsCrafts, compName),
    ) as Crafts

    // Apply craft shorthand on top of merged crafts
    const craftValue = toValue(craftProp)
    if (craftValue) {
      Object.assign(mergedCrafts, resolveCraftShorthand(craftValue, compName, mergedCrafts))
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
      if (contextCrafts || Object.keys(contextRest).length)
        sources.push('context')
      if (propsCrafts || Object.keys(propsRest).length)
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
