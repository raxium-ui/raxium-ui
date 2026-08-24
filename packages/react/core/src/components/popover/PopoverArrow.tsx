import { PopoverArrow as ArkPopoverArrow, PopoverArrowTip } from '@ark-ui/react/popover'
import { createArrow } from '../arrow/createArrow'

export const PopoverArrow = createArrow(ArkPopoverArrow, PopoverArrowTip)
PopoverArrow.displayName = 'Popover.Arrow'
