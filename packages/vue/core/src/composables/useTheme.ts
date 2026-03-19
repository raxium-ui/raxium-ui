import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { Crafts, ThemeProps } from '../providers/theme/theme-props'
import { crafts } from '@raxium/themes/default'
import { tv } from '@raxium/themes/utils'
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

export function useTheme(): UseThemeReturn
export function useTheme<T = ThemeProps>(
  props?: MaybeRefOrGetter<Partial<T> | undefined>,
): UseThemeReturn
export function useTheme<T>(props?: MaybeRefOrGetter<Partial<T> | undefined>): UseThemeReturn {
  const configTheme = useConfig('theme')
  const contextTheme = injectThemeContext(computed(() => ({})))
  const propsTheme = computed(() => toValue(props) ?? {})

  const vm = getCurrentInstance()
  const compName = vm?.type.__name

  return computed(() => {
    const { crafts: configCrafts, ...configRest } = clean(configTheme) as any
    const { crafts: contextCrafts, ...contextRest } = clean(contextTheme) as any
    const { crafts: propsCrafts, ...propsRest } = clean(propsTheme) as any

    const themeRest = Object.assign(
      {
        skin: 'razer',
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

    return {
      ...themeRest,
      crafts: mergedCrafts,
    } as unknown as Omit<ThemeProps, 'crafts'> & { crafts: Crafts }
  })
}

export function useCustomTheme<T>(props?: MaybeRefOrGetter<T | undefined>): UseThemeReturn {
  return useTheme<T>(props ?? {})
}
