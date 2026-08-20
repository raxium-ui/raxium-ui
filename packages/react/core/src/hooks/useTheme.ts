import type { ResolvedTheme, ThemeConfig, ThemeProps } from '../providers/theme/theme-props'
import {
  cleanThemeProps,
  mergeCraftTables,
  mergeThemeRest,
} from '@raxium/themes/runtime'
import { useContext, useMemo } from 'react'
import { RUIConfigReactContext } from '../providers/config/rui-config-context'
import { ScopeThemeContext } from '../providers/theme/theme-props'
import { usePreferredColorScheme } from './usePreferredColorScheme'

/**
 * Resolve and merge theme props from four token layers:
 * Defaults → Global Config → Component Config → Scope Theme → Props.
 *
 * Crafts table is merged **only** from `RUIConfig.theme.crafts` (plus library
 * defaults). ThemeProvider / component `theme` never carry crafts.
 */
export function useTheme<T = ThemeProps>(
  props?: Partial<T>,
  componentConfig?: Partial<T>,
): ResolvedTheme {
  const ruiConfig = useContext(RUIConfigReactContext)
  const contextTheme = useContext(ScopeThemeContext)
  const systemSurface = usePreferredColorScheme()

  return useMemo(() => {
    const config = cleanThemeProps(ruiConfig.theme) as Partial<ThemeConfig>
    const { crafts: configCrafts, ...configRest } = config
    const componentRest = cleanThemeProps(componentConfig as ThemeProps | undefined)
    const contextRest = cleanThemeProps(contextTheme)
    const propsRest = cleanThemeProps(props as ThemeProps | undefined)

    const themeRest = mergeThemeRest(
      configRest,
      componentRest,
      contextRest,
      propsRest,
    )

    if (themeRest.surface === 'system')
      themeRest.surface = systemSurface

    return {
      ...themeRest,
      crafts: mergeCraftTables(configCrafts),
    } satisfies ResolvedTheme
  }, [ruiConfig.theme, componentConfig, contextTheme, props, systemSurface])
}
