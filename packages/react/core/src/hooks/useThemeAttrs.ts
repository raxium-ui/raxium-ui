import type { ThemeProps } from '../providers/theme/theme-props'
import { useMemo } from 'react'

/**
 * data-attributes for portal / teleported elements that live outside the
 * normal DOM hierarchy and cannot inherit theme attributes via CSS cascade.
 */
export function useThemeAttrs(theme: ThemeProps) {
  return useMemo(() => ({
    'data-theme-skin': theme.skin,
    'data-theme-surface': theme.surface,
    'data-theme-bordered': theme.bordered ? '' : undefined,
  }), [theme.skin, theme.surface, theme.bordered])
}
