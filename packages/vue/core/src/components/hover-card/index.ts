import {
  HoverCardArrow as ArkHoverCardArrow,
  HoverCardArrowTip as ArkHoverCardArrowTip,
} from '@ark-ui/vue/hover-card'
import { createArrow } from '@raxium/vue/components/arrow/createArrow'

export { default as HoverCard } from './HoverCard.vue'
export { default as HoverCardContent } from './HoverCardContent.vue'
export * from './props'
const HoverCardArrow = createArrow(ArkHoverCardArrow, ArkHoverCardArrowTip)
export { HoverCardArrow }
export { HoverCardTrigger } from '@ark-ui/vue/hover-card'
