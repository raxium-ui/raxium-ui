import type {
  CraftOverride,
  Crafts,
  ResolvedTheme,
  SlotKeysOf,
  ThemeProps,
} from '@raxium/themes/runtime'
import type { ComputedRef, HTMLAttributes } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export type {
  CraftOverride,
  Crafts,
  ResolvedTheme,
  Skin,
  SlotKeysOf,
  Surface,
  ThemeConfig,
  ThemeProps,
} from '@raxium/themes/runtime'

/** Auto-derived ui prop type: maps each slot key to a Vue class value */
export type UIProps<K extends keyof Crafts> = Partial<
  Record<SlotKeysOf<Crafts[K]>, HTMLAttributes['class']>
>

export interface ThemeCrafts<K extends keyof Crafts> {
  /** Theme tokens (skin, surface, size, …). Crafts live on `RUIConfig.theme.crafts`. */
  theme?: ThemeProps
  /** Per-component craft override */
  craft?: CraftOverride<K>
}
export interface ThemeNoCrafts {
  theme?: ThemeProps
}

/**
 * Component Theme — internal channel.
 * Provided by every component root node (Dialog, Tooltip, Accordion, …).
 * Carries the fully resolved theme (tokens + crafts) for sub-components.
 */
export const [provideComponentTheme, injectComponentTheme]
  = createContext<ComputedRef<ResolvedTheme>>('componentTheme')

/**
 * Scope Theme — user intent channel (tokens only).
 * Provided when the user sets `:theme` on a component, or via `<ThemeProvider>`.
 * Does not carry crafts — crafts come from `RUIConfig.theme.crafts` only.
 */
export const [provideScopeTheme, injectScopeTheme]
  = createContext<ComputedRef<ThemeProps>>('scopeTheme')
