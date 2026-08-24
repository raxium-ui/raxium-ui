import type {
  ScrollAreaCornerBaseProps,
  ScrollAreaRootBaseProps,
  ScrollAreaScrollbarBaseProps,
  ScrollAreaViewportBaseProps,
} from '@ark-ui/react/scroll-area'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface ScrollAreaProps extends ScrollAreaRootBaseProps, ThemeCrafts<'tvScrollArea'> {
  className?: ClassName
  ui?: {
    root?: ClassName
  }
  children?: ReactNode
}

export interface ScrollAreaViewportProps extends ScrollAreaViewportBaseProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    root?: ClassName
    content?: ClassName
  }
  onScrollStart?: (event: Event) => void
  onScrollEnd?: (event: Event) => void
  children?: ReactNode
}

export interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarBaseProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    root?: ClassName
    thumb?: ClassName
  }
}

export interface ScrollAreaCornerProps extends ScrollAreaCornerBaseProps, ThemeNoCrafts {
  className?: ClassName
}
