import type { ComputedRef } from 'vue'
import type { ThemeProps } from '../providers/theme/theme-props'
import { computed } from 'vue'

type ThemeLike = ComputedRef<Omit<ThemeProps, 'crafts'>>

/**
 * Returns reactive data-attributes for portal / teleported elements that live
 * outside the normal DOM hierarchy and therefore cannot inherit theme attributes
 * from ancestor elements via CSS cascade.
 *
 * Inline (non-portal) components do NOT need these attributes — `skin` cascades
 * from `<html>` and `surface` cascades from the nearest ancestor with
 * `[data-theme-surface]` (both use descendant selectors in the CSS custom variants).
 */
export function useThemeAttrs(theme: ThemeLike) {
  return computed(() => ({
    'data-theme-skin': theme.value.skin,
    'data-theme-surface': theme.value.surface,
    'data-theme-bordered': theme.value.bordered ? '' : undefined,
  }))
}
