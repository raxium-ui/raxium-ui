import type {
  CraftOverride,
  Crafts,
  ResolvedTheme,
  SlotKeysOf,
  ThemeProps,
} from '@raxium/themes/runtime'
import { mergeCraftTables } from '@raxium/themes/runtime'
import { createContext } from 'react'

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

/** Auto-derived ui prop type: maps each slot key to a class value */
export type UIProps<K extends keyof Crafts> = Partial<
  Record<SlotKeysOf<Crafts[K]>, string>
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

const emptyComponentTheme: ResolvedTheme = {
  crafts: mergeCraftTables(),
}

/**
 * Component Theme — internal channel.
 * Provided by every component root (Dialog, Tooltip, Accordion, …).
 */
export const ComponentThemeContext = createContext<ResolvedTheme>(emptyComponentTheme)

/**
 * Scope Theme — user intent channel (tokens only).
 * Provided when the user sets `theme` on a component, or via `<ThemeProvider>`.
 */
export const ScopeThemeContext = createContext<ThemeProps>({})
