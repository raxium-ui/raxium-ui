import type { crafts } from '@raxium/themes/default'
import type { tv } from '@raxium/themes/utils'
import type { ComputedRef, HTMLAttributes } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export type Skin = 'default' | 'razer' | 'shadcn'
export type Surface = 'light' | 'dark' | (string & {})
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

type ShallowKeyed<T> = Partial<Record<Extract<keyof T, string>, any>>
type CraftInput<T> = T extends {
  base?: infer B
  slots?: infer S
  variants?: infer V
  defaultVariants?: infer D
}
  ? {
      base?: ShallowKeyed<B>
      slots?: ShallowKeyed<S>
      variants?: ShallowKeyed<V>
      defaultVariants?: ShallowKeyed<D>
      compoundVariants?: Array<Record<string, any>>
      compoundSlots?: Array<Record<string, any>>
    }
  : never

// ── UIProps: auto-derive ui prop type from craft slot keys ──

/** Extract slot key names from a craft function's return type */
export type SlotKeysOf<T> = T extends (...args: any[]) => infer R
  ? Extract<keyof R, string>
  : never

/** Auto-derived ui prop type: maps each slot key to a class value */
export type UIProps<K extends keyof Crafts> = Partial<
  Record<SlotKeysOf<Crafts[K]>, HTMLAttributes['class']>
>

// ── CraftShorthand: simplified craft override API ──

/** Shorthand craft override for component-level customization */
export type CraftShorthand<K extends keyof Crafts> = {
  /** Append class to root slot */
  class?: HTMLAttributes['class']
  /** Append classes per slot */
  slots?: Partial<Record<SlotKeysOf<Crafts[K]>, HTMLAttributes['class']>>
  /** Override default variant values */
  defaults?: Crafts[K] extends (...args: infer A) => any
    ? A extends [infer P, ...any[]] ? Partial<P> : never
    : never
  /** Deep extend craft definition (full CraftInput) */
  extend?: CraftInput<Crafts[K]>
}

export interface ThemeCrafts<K extends keyof Crafts> {
  theme?: Omit<ThemeProps, 'crafts'> & {
    crafts?: CraftInput<Crafts[K]> | (() => ReturnType<typeof tv>) | Crafts
  }
  /** Shorthand craft override — simpler alternative to theme.crafts */
  craft?: CraftShorthand<K>
}
export interface ThemeNoCrafts {
  theme?: Omit<ThemeProps, 'crafts'>
}

export const [privideThemeContext, injectThemeContext]
  = createContext<ComputedRef<ThemeProps>>('theme')
