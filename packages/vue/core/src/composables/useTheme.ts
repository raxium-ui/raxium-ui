import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { ResolvedTheme, ThemeConfig, ThemeProps } from '../providers/theme/theme-props'
import {
  cleanThemeProps,
  mergeCraftTables,
  mergeThemeRest,
} from '@raxium/themes/runtime'
import { computed, getCurrentInstance, toValue, watchEffect } from 'vue'
import { injectScopeTheme } from '../providers/theme/theme-props'
import { useConfig } from './useConfig'
import { usePreferredColorScheme } from './usePreferredColorScheme'

type UseThemeReturn = ComputedRef<ResolvedTheme>

function cleanThemePropsFromRef(
  obj: ComputedRef<ThemeProps | undefined>,
): Partial<ThemeProps> {
  return cleanThemeProps(obj.value)
}

/**
 * Resolve and merge theme props from four token layers:
 * Defaults → Global Config → Component Config → Scope Theme → Props.
 *
 * Crafts table is merged **only** from `RUIConfig.theme.crafts` (plus library
 * defaults). ThemeProvider / component `:theme` never carry crafts.
 *
 * Instance `craft` overrides are **not** handled here — pass them to
 * `useCraft(..., craft)` or bake them via `useThemeCraft`.
 *
 * Intended for independent/root components (Tooltip, Popover, Dialog, etc.)
 * that define their own theming boundary and should react to Scope Theme.
 * Structural sub-components should prefer `useInheritedTheme()`.
 *
 * `skin` and `surface` are consumed exclusively by CSS custom variants via
 * data-attributes (`data-theme-skin`, `data-theme-surface`), NOT by tv() variants.
 */
export function useTheme(): UseThemeReturn
export function useTheme<T = ThemeProps>(
  props?: MaybeRefOrGetter<Partial<T> | undefined>,
  componentConfig?: MaybeRefOrGetter<Partial<T> | undefined>,
): UseThemeReturn
/**
 * @param props - Instance-level theme token overrides from `:theme`.
 * @param componentConfig - Component-type token defaults from `RUIConfig.<comp>.theme`.
 * @returns Fully merged tokens + resolved `crafts` map.
 */
export function useTheme<T>(
  props?: MaybeRefOrGetter<Partial<T> | undefined>,
  componentConfig?: MaybeRefOrGetter<Partial<T> | undefined>,
): UseThemeReturn {
  const configTheme = useConfig('theme')
  const contextTheme = injectScopeTheme(computed(() => ({})))
  const componentConfigTheme = computed(() => toValue(componentConfig) ?? {})
  const propsTheme = computed(() => toValue(props) ?? {})
  const systemSurface = usePreferredColorScheme()

  const merged = computed(() => {
    const config = cleanThemeProps(configTheme.value) as Partial<ThemeConfig>
    const { crafts: configCrafts, ...configRest } = config
    const componentRest = cleanThemePropsFromRef(componentConfigTheme)
    const contextRest = cleanThemePropsFromRef(contextTheme)
    const propsRest = cleanThemePropsFromRef(propsTheme)

    const themeRest = mergeThemeRest(
      configRest,
      componentRest,
      contextRest,
      propsRest,
    )

    if (themeRest.surface === 'system')
      themeRest.surface = systemSurface.value

    // Crafts: library defaults ← RUIConfig.theme.crafts only
    const mergedCrafts = mergeCraftTables(configCrafts)

    return {
      ...themeRest,
      crafts: mergedCrafts,
    } satisfies ResolvedTheme
  })

  if (import.meta.env.DEV) {
    const vm = getCurrentInstance()
    watchEffect(() => {
      const config = cleanThemeProps(configTheme.value) as Partial<ThemeConfig>
      const { crafts: configCrafts, ...configRest } = config
      const componentRest = cleanThemePropsFromRef(componentConfigTheme)
      const contextRest = cleanThemePropsFromRef(contextTheme)
      const propsRest = cleanThemePropsFromRef(propsTheme)

      const sources: string[] = []
      if (configCrafts || Object.keys(configRest).length)
        sources.push('config')
      if (Object.keys(componentRest).length)
        sources.push('component-config')
      if (Object.keys(contextRest).length)
        sources.push('context')
      if (Object.keys(propsRest).length)
        sources.push('props')

      try {
        const el = vm?.proxy?.$el as HTMLElement | undefined
        el?.setAttribute?.('data-rui-theme-source', sources.join(','))
      }
      catch {}
    })
  }

  return merged
}
