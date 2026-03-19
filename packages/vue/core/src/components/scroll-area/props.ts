import type { ScrollAreaCornerBaseProps, ScrollAreaRootBaseProps, ScrollAreaScrollbarBaseProps } from '@ark-ui/vue'
import type { ScrollAreaVariants } from '@raxium/themes/default'
import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface ScrollAreaTheme extends Omit<ThemeCrafts<'tvScrollArea'>, 'size'> {
  size?: ScrollAreaVariants['size']
}

export interface ScrollAreaProps extends ScrollAreaRootBaseProps {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    viewport?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
  }
  theme?: ScrollAreaTheme
}

export type ScrollAreaEmits = {
  scrollstart: [event: Event]
  scrollend: [event: Event]
  scroll: [event: Event]
}

export interface ScrollAreaCornerProps extends ScrollAreaCornerBaseProps {
  class?: HTMLAttributes['class']
  theme?: Omit<ScrollAreaTheme, 'crafts'>
}

export interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarBaseProps {
  class?: HTMLAttributes['class']
  theme?: Omit<ScrollAreaTheme, 'crafts'>
  ui?: {
    root?: HTMLAttributes['class']
    thumb?: HTMLAttributes['class']
  }
}
