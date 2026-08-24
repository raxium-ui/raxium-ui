import { TooltipArrow as ArkTooltipArrow, TooltipArrowTip } from '@ark-ui/react/tooltip'
import { createArrow } from '../arrow/createArrow'

export const TooltipArrow = createArrow(ArkTooltipArrow, TooltipArrowTip)
TooltipArrow.displayName = 'Tooltip.Arrow'
