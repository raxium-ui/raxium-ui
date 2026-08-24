import type {
  TooltipContentProps as ArkTooltipContentProps,
  TooltipRootBaseProps,
} from '@ark-ui/react/tooltip'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface TooltipProps extends TooltipRootBaseProps, ThemeCrafts<'tvTooltip'> {
  children?: ReactNode
}

export interface TooltipContentProps extends ArkTooltipContentProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    positioner?: ClassName
    content?: ClassName
    inner?: ClassName
  }
  children?: ReactNode
}
