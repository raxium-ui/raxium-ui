import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

/** Theme properties that get auto-injected into craft calls */
const THEME_KEYS = ['skin', 'surface', 'size', 'unstyled', 'bordered'] as const

/**
 * Pre-binds variant values + theme props to a craft, simplifying slot calls in templates.
 *
 * For **slotted** crafts (with `slots`), returns an object of slot functions:
 * ```ts
 * const craft = useCraft(theme, 'tvButton', () => ({ variant, color }))
 * // template: craft.root({ class: extra })
 * ```
 *
 * For **base-only** crafts (no `slots`), returns a callable function:
 * ```ts
 * const craft = useCraft(theme, 'tvBadge', () => ({ variant }))
 * // template: craft({ class: extra })  — or just craft() for no extras
 * ```
 */
export function useCraft<T = any>(
  theme: ComputedRef<Record<string, any>>,
  craftKey: string,
  variants?: MaybeRefOrGetter<Record<string, any>>,
): ComputedRef<T> {
  return computed(() => {
    const t = theme.value
    const craftFn = t.crafts?.[craftKey]
    if (!craftFn) {
      if (import.meta.env.DEV) {
        console.warn(`[useCraft] Craft "${craftKey}" not found in theme`)
      }
      return (() => '') as T
    }

    // Theme props first, then user variants (user overrides theme)
    const themeProps: Record<string, any> = {}
    for (const key of THEME_KEYS) {
      if (t[key] !== undefined)
        themeProps[key] = t[key]
    }

    const v = variants ? toValue(variants) : {}
    const bound = { ...themeProps, ...v }
    const result = craftFn(bound)

    // Base-only craft: craftFn(variants) returns a string directly.
    // Wrap it so the component can still pass { class } at call time.
    if (typeof result === 'string') {
      return ((opts?: Record<string, any>) =>
        opts ? craftFn({ ...bound, ...opts }) : result) as T
    }

    // Slotted craft: result is { root: fn, loading: fn, ... }
    return result as T
  })
}
