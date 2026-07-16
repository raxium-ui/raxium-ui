import type { CraftOverride, Crafts, ResolvedTheme } from '../providers/theme/theme-props'
import { patchCraftTable } from '@raxium/themes/runtime'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

/**
 * Bake a per-instance `craft` override into the theme's crafts table for a
 * single explicit `craftKey`, so descendant `useInheritedTheme` + `useCraft`
 * calls pick it up.
 *
 * Use on root components that `provide` theme but do not (only) call `useCraft`
 * themselves (Dialog, Select, FloatingPanel, …). Leaf components that call
 * `useCraft` directly should pass `craft` to `useCraft` instead.
 *
 * When `craft` is undefined, returns the original `theme` ref (stable identity).
 */
export function useThemeCraft<K extends keyof Crafts>(
  theme: ComputedRef<ResolvedTheme>,
  craftKey: K,
  craft?: MaybeRefOrGetter<CraftOverride<NoInfer<K>> | undefined>,
): ComputedRef<ResolvedTheme> {
  if (!craft)
    return theme

  return computed(() => {
    const override = toValue(craft)
    if (!override)
      return theme.value

    return {
      ...theme.value,
      crafts: patchCraftTable(theme.value.crafts, craftKey, override),
    }
  })
}
