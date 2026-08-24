import { TooltipTrigger, useTooltipContext } from '@ark-ui/react/tooltip'
import { TooltipRoot } from './Tooltip'
import { TooltipArrow } from './TooltipArrow'
import { TooltipContent } from './TooltipContent'

export const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
})

export {
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
  useTooltipContext,
}

export type { TooltipContentProps, TooltipProps } from './props'
export type { ArrowProps as TooltipArrowProps } from '../arrow/createArrow'
