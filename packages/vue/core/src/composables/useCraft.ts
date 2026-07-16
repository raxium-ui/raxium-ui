import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { CraftOverride, Crafts } from '../providers/theme/theme-props'
import { resolveCraftOverride } from '@raxium/themes/runtime'
import { computed, toValue } from 'vue'

/** Theme properties that get auto-injected into craft calls */
const THEME_KEYS = ['skin', 'surface', 'size', 'unstyled', 'bordered'] as const

/**
 * Resolve the return type of useCraft based on craft type:
 * - Slotted crafts (tvButton): returns slot object { root: fn, loading: fn, ... }
 * - Base-only crafts (tvBadge): returns a callable (opts?) => string
 */
type CraftReturnType<K extends keyof Crafts>
  = ReturnType<Crafts[K]> extends string
    ? (opts?: { class?: string }) => string
    : ReturnType<Crafts[K]>

/**
 * Pre-binds variant values + theme props to a craft, providing full type inference.
 *
 * For **slotted** crafts, returns typed slot functions:
 * ```ts
 * const craft = useCraft(theme, 'tvButton', () => ({ variant, color }), () => craftProp)
 * craft.root({ class: extra })   // ✅ autocomplete for .root, .loading
 * ```
 *
 * For **base-only** crafts, returns a callable function:
 * ```ts
 * const craft = useCraft(theme, 'tvBadge', () => ({ variant }))
 * craft({ class: extra })        // ✅ returns string
 * ```
 *
 * @param craftOverride - Optional instance-level craft override for this `craftKey`.
 *   Prefer this over baking overrides in `useTheme`. For roots that provide theme
 *   to children, use `useThemeCraft` instead so descendants inherit the override.
 */
export function useCraft<K extends keyof Crafts>(
  theme: ComputedRef<{ crafts: Crafts } & Record<string, any>>,
  craftKey: K,
  variants?: MaybeRefOrGetter<Record<string, any>>,
  /** `NoInfer` keeps `craftKey` as the source of truth for `K` (e.g. ThemeCrafts<'tvInput' | 'tvNumberInput'>) */
  craftOverride?: MaybeRefOrGetter<CraftOverride<NoInfer<K>> | undefined>,
): ComputedRef<CraftReturnType<K>> {
  return computed(() => {
    const t = theme.value
    const baseCraftFn = t.crafts?.[craftKey]
    if (!baseCraftFn) {
      if (import.meta.env.DEV) {
        console.warn(`[useCraft] Craft "${String(craftKey)}" not found in theme`)
      }
      return (() => '') as CraftReturnType<K>
    }

    const override = craftOverride ? toValue(craftOverride) : undefined
    const craftFn = resolveCraftOverride(craftKey, override, baseCraftFn)

    // Theme props first, then user variants (user overrides theme)
    const themeProps: Record<string, any> = {}
    for (const key of THEME_KEYS) {
      if (t[key] !== undefined)
        themeProps[key] = t[key]
    }

    const v = variants ? toValue(variants) : {}
    const bound = { ...themeProps, ...v }
    /** Narrow call signature: `Crafts[K]` unions (tailwind-variants) blow TS inference on `craftFn(bound)`. */
    const runCraft = craftFn as (input: Record<string, unknown>) => unknown
    const result = runCraft(bound)

    // Base-only craft: craftFn(variants) returns a string directly.
    // Wrap it so the component can still pass { class } at call time.
    if (typeof result === 'string') {
      return ((opts?: { class?: string }) =>
        opts?.class ? runCraft({ ...bound, ...opts }) : result) as CraftReturnType<K>
    }

    // Slotted craft: result is { root: fn, loading: fn, ... }
    return result as CraftReturnType<K>
  })
}
