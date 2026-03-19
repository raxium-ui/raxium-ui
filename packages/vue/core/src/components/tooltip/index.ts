import {
  TooltipArrow as ArkTooltipArrow,
  TooltipArrowTip as ArkTooltipArrowTip,
} from '@ark-ui/vue/tooltip'
import { createArrow } from '@raxium/vue/components/arrow/createArrow'

export * from './props'
export { default as Tooltip } from './Tooltip.vue'
export { default as TooltipContent } from './TooltipContent.vue'
const TooltipArrow = createArrow(ArkTooltipArrow, ArkTooltipArrowTip)
export { TooltipArrow }
export { TooltipTrigger } from '@ark-ui/vue/tooltip'
