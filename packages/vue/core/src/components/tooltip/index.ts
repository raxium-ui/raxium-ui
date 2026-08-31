import {
  TooltipArrow as ArkTooltipArrow,
  TooltipArrowTip as ArkTooltipArrowTip,
  TooltipTrigger,
} from '@ark-ui/vue/tooltip'
import { createArrow } from '@raxium/vue/components/arrow/createArrow'
import { withCompoundParts } from '../../utils/withCompoundParts'
import TooltipRoot from './Tooltip.vue'
import TooltipContent from './TooltipContent.vue'

const TooltipArrow = createArrow(ArkTooltipArrow, ArkTooltipArrowTip)

export const Tooltip = withCompoundParts(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
})

export { TooltipArrow, TooltipContent, TooltipTrigger }
export * from './props'
