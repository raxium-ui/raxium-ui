import type { CraftOverride, Crafts, ResolvedTheme } from '../providers/theme/theme-props'
import { resolveCraftOverride } from '@raxium/themes/runtime'
import { useMemo } from 'react'

const THEME_KEYS = ['skin', 'surface', 'size', 'unstyled', 'bordered'] as const

type CraftReturnType<K extends keyof Crafts>
  = ReturnType<Crafts[K]> extends string
    ? (opts?: { class?: string }) => string
    : ReturnType<Crafts[K]>

/**
 * Pre-binds variant values + theme tokens to a craft.
 */
export function useCraft<K extends keyof Crafts>(
  theme: ResolvedTheme,
  craftKey: K,
  variants?: Record<string, unknown>,
  craftOverride?: CraftOverride<NoInfer<K>>,
): CraftReturnType<K> {
  return useMemo(() => {
    const baseCraftFn = theme.crafts?.[craftKey]
    if (!baseCraftFn) {
      if (import.meta.env.DEV)
        console.warn(`[useCraft] Craft "${String(craftKey)}" not found in theme`)
      return (() => '') as CraftReturnType<K>
    }

    const craftFn = resolveCraftOverride(craftKey, craftOverride, baseCraftFn)
    const themeProps: Record<string, unknown> = {}
    for (const key of THEME_KEYS) {
      if (theme[key] !== undefined)
        themeProps[key] = theme[key]
    }

    const bound = { ...themeProps, ...variants }
    const runCraft = craftFn as (input: Record<string, unknown>) => unknown
    const result = runCraft(bound)

    if (typeof result === 'string') {
      return ((opts?: { class?: string }) =>
        opts?.class ? runCraft({ ...bound, ...opts }) : result) as CraftReturnType<K>
    }

    return result as CraftReturnType<K>
  }, [theme, craftKey, variants, craftOverride])
}
