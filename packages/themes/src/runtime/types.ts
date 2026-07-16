import type { ClassValue } from 'clsx'
import type { crafts } from '../default'

export type Skin = 'default' | 'razer' | 'shadcn'
export type Surface = 'light' | 'dark' | 'system' | (string & {})
export type Crafts = typeof crafts

/**
 * Theme tokens only — used by `ThemeProvider`, Scope Theme, and component `:theme`.
 * Does **not** carry the crafts table; put crafts on `ThemeConfig` (`RUIConfig.theme`).
 */
export interface ThemeProps {
  skin?: Skin
  surface?: Surface
  size?: 'base' | 'sm' | 'lg' | 'xs' | undefined
  unstyled?: boolean
  bordered?: boolean
}

/**
 * App-level theme config (`RUIConfig.theme`): tokens + optional crafts table override.
 */
export interface ThemeConfig extends ThemeProps {
  /** Partial crafts map merged over library defaults (presets / skin packs). */
  crafts?: Partial<Crafts>
}

/**
 * Fully resolved theme after merge — tokens + concrete crafts map.
 * This is the shape returned by `useTheme` / inherited by sub-components.
 */
export type ResolvedTheme = ThemeProps & { crafts: Crafts }

/** Extract slot key names from a craft function's return type */
export type SlotKeysOf<T> = T extends (...args: any[]) => infer R
  ? Extract<keyof R, string>
  : never

/**
 * Per-component craft customization — merged onto a resolved `tv*` craft.
 * Framework-agnostic: use `ClassValue` instead of framework-specific class types.
 */
export type CraftOverride<K extends keyof Crafts> = {
  /** Append classes per slot */
  slots?: Partial<Record<SlotKeysOf<Crafts[K]>, ClassValue>>
  /** Override default variant values */
  defaultVariants?: Crafts[K] extends (...args: infer A) => any
    ? A extends [infer P, ...any[]] ? Partial<P> : never
    : never
  /** Override or extend base classes */
  base?: ClassValue
  /** Override or extend variant definitions */
  variants?: Record<string, Record<string, any>>
  /** Add compound variants */
  compoundVariants?: Array<Record<string, any>>
  /** Add compound slots */
  compoundSlots?: Array<Record<string, any>>
}
