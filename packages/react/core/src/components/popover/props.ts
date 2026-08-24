import type {
  PopoverContentProps as ArkPopoverContentProps,
  PopoverRootBaseProps,
} from '@ark-ui/react/popover'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface PopoverProps extends PopoverRootBaseProps, ThemeCrafts<'tvPopover'> {
  children?: ReactNode
}

export interface PopoverCloseProps extends ThemeNoCrafts {
  className?: ClassName
  asChild?: boolean
  children?: ReactNode
}

export interface PopoverContentProps extends ArkPopoverContentProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    positioner?: ClassName
    content?: ClassName
    inner?: ClassName
  }
  children?: ReactNode
}

export interface PopoverIndicatorProps extends ThemeNoCrafts {
  className?: ClassName
  asChild?: boolean
  children?: ReactNode
}
