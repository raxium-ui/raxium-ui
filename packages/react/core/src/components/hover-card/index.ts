import { HoverCardTrigger, useHoverCardContext } from '@ark-ui/react/hover-card'
import { HoverCardRoot } from './HoverCard'
import { HoverCardArrow } from './HoverCardArrow'
import { HoverCardContent } from './HoverCardContent'

export const HoverCard = Object.assign(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
  Arrow: HoverCardArrow,
})

export {
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
  useHoverCardContext,
}

export type { HoverCardContentProps, HoverCardProps } from './props'
export type { ArrowProps as HoverCardArrowProps } from '../arrow/createArrow'
