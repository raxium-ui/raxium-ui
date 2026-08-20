import type { CraftOverride, Crafts, ResolvedTheme } from '../providers/theme/theme-props'
import { patchCraftTable } from '@raxium/themes/runtime'
import { useMemo } from 'react'

/**
 * Bake a per-instance `craft` override into the theme's crafts table so
 * descendant `useInheritedTheme` + `useCraft` calls pick it up.
 */
export function useThemeCraft<K extends keyof Crafts>(
  theme: ResolvedTheme,
  craftKey: K,
  craft?: CraftOverride<NoInfer<K>>,
): ResolvedTheme {
  return useMemo(() => {
    if (!craft)
      return theme

    return {
      ...theme,
      crafts: patchCraftTable(theme.crafts, craftKey, craft),
    }
  }, [theme, craftKey, craft])
}
