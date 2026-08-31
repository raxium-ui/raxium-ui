import {
  HoverCardArrow as ArkHoverCardArrow,
  HoverCardArrowTip as ArkHoverCardArrowTip,
  HoverCardTrigger,
} from '@ark-ui/vue/hover-card'
import { createArrow } from '@raxium/vue/components/arrow/createArrow'
import { withCompoundParts } from '../../utils/withCompoundParts'
import HoverCardRoot from './HoverCard.vue'
import HoverCardContent from './HoverCardContent.vue'

const HoverCardArrow = createArrow(ArkHoverCardArrow, ArkHoverCardArrowTip)

export const HoverCard = withCompoundParts(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
  Arrow: HoverCardArrow,
})

export { HoverCardArrow, HoverCardContent, HoverCardTrigger }
export * from './props'
