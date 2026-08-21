import type {
  HoverCardContentProps as ArkHoverCardContentProps,
  HoverCardRootBaseProps,
} from '@ark-ui/react/hover-card'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface HoverCardProps extends HoverCardRootBaseProps, ThemeCrafts<'tvHoverCard'> {
  children?: ReactNode
}

export interface HoverCardContentProps extends ArkHoverCardContentProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    positioner?: ClassName
    content?: ClassName
    inner?: ClassName
  }
  children?: ReactNode
}
