import {
  PopoverCloseTrigger,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  usePopoverContext,
} from '@ark-ui/react/popover'
import { PopoverRoot } from './Popover'
import { PopoverArrow } from './PopoverArrow'
import { PopoverClose } from './PopoverClose'
import { PopoverContent } from './PopoverContent'
import { PopoverIndicator } from './PopoverIndicator'

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Close: PopoverClose,
  CloseTrigger: PopoverCloseTrigger,
  Indicator: PopoverIndicator,
  Title: PopoverTitle,
  Description: PopoverDescription,
})

export {
  PopoverArrow,
  PopoverClose,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverIndicator,
  PopoverTitle,
  PopoverTrigger,
  usePopoverContext,
}

export type {
  PopoverCloseProps,
  PopoverContentProps,
  PopoverIndicatorProps,
  PopoverProps,
} from './props'
export type { ArrowProps as PopoverArrowProps } from '../arrow/createArrow'
