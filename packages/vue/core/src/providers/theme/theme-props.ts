import type { crafts } from '@raxium/themes/default'
import type { ComputedRef, HTMLAttributes } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export type Skin = 'default' | 'razer' | 'shadcn'
export type Surface = 'light' | 'dark' | 'system' | (string & {})
export type Crafts = typeof crafts
export interface ThemeProps {
  skin?: Skin
  surface?: Surface
  size?: 'base' | 'sm' | 'lg' | 'xs' | undefined
  unstyled?: boolean
  bordered?: boolean
  crafts?: Partial<Crafts>
}
export interface Theme {
  theme?: ThemeProps
}

// ── UIProps: auto-derive ui prop type from craft slot keys ──

/** Extract slot key names from a craft function's return type */
export type SlotKeysOf<T> = T extends (...args: any[]) => infer R
  ? Extract<keyof R, string>
  : never

/** Auto-derived ui prop type: maps each slot key to a class value */
export type UIProps<K extends keyof Crafts> = Partial<
  Record<SlotKeysOf<Crafts[K]>, HTMLAttributes['class']>
>

// ── CraftOverride: per-component craft customization ──

/** Per-component craft override — merged with resolved crafts from config/context */
export type CraftOverride<K extends keyof Crafts> = {
  /** Append classes per slot */
  slots?: Partial<Record<SlotKeysOf<Crafts[K]>, HTMLAttributes['class']>>
  /** Override default variant values */
  defaultVariants?: Crafts[K] extends (...args: infer A) => any
    ? A extends [infer P, ...any[]] ? Partial<P> : never
    : never
  /** Override or extend base classes */
  base?: HTMLAttributes['class']
  /** Override or extend variant definitions */
  variants?: Record<string, Record<string, any>>
  /** Add compound variants */
  compoundVariants?: Array<Record<string, any>>
  /** Add compound slots */
  compoundSlots?: Array<Record<string, any>>
}

export interface ThemeCrafts<K extends keyof Crafts> {
  /** Theme props (skin, surface, size, etc.) — crafts are set at config/context level */
  theme?: Omit<ThemeProps, 'crafts'>
  /** Per-component craft override */
  craft?: CraftOverride<K>
}
export interface ThemeNoCrafts {
  theme?: Omit<ThemeProps, 'crafts'>
}

export const [privideThemeContext, injectThemeContext]
  = createContext<ComputedRef<ThemeProps>>('theme')
