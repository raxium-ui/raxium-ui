import type { crafts } from '@raxium/themes/default'
import type { tv } from '@raxium/themes/utils'
import type { ComputedRef } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export type Skin = 'razer' | 'shadcn'
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
export interface ThemeCrafts<K extends keyof Crafts> {
  theme?: Omit<ThemeProps, 'crafts'> & {
    crafts?: CraftInput<Crafts[K]> | (() => ReturnType<typeof tv>) | Crafts
  }
}
export interface ThemeNoCrafts {
  theme?: Omit<ThemeProps, 'crafts'>
}

export const [privideThemeContext, injectThemeContext]
  = createContext<ComputedRef<ThemeProps>>('theme')
