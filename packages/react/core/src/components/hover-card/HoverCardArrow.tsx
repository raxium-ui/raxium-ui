import { HoverCardArrow as ArkHoverCardArrow, HoverCardArrowTip } from '@ark-ui/react/hover-card'
import { createArrow } from '../arrow/createArrow'

export const HoverCardArrow = createArrow(ArkHoverCardArrow, HoverCardArrowTip)
HoverCardArrow.displayName = 'HoverCard.Arrow'
