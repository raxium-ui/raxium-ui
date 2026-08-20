import type { ResolvedTheme, ThemeProps } from '../providers/theme/theme-props'
import { omitBy } from 'es-toolkit'
import { isNil } from 'es-toolkit/compat'
import { useContext, useMemo } from 'react'
import { ComponentThemeContext } from '../providers/theme/theme-props'

/**
 * Lightweight theme hook for sub-components (Trigger / Content / Item).
 * Reads the parent Component Theme and merges only local token overrides.
 */
export function useInheritedTheme(props?: Partial<ThemeProps>): ResolvedTheme {
  const parentTheme = useContext(ComponentThemeContext)

  return useMemo(() => {
    if (!props)
      return parentTheme

    const propsValue = omitBy(props, value => isNil(value))
    if (Object.keys(propsValue).length === 0)
      return parentTheme

    return {
      ...parentTheme,
      ...propsValue,
    }
  }, [parentTheme, props])
}
