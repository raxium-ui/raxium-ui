import {
  PopoverArrow as ArkPopoverArrow,
  PopoverArrowTip as ArkPopoverArrowTip,
  PopoverCloseTrigger,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@ark-ui/vue/popover'
import { createArrow } from '@raxium/vue/components/arrow/createArrow'
import { withCompoundParts } from '../../utils/withCompoundParts'
import PopoverRoot from './Popover.vue'
import PopoverClose from './PopoverClose.vue'
import PopoverContent from './PopoverContent.vue'
import PopoverIndicator from './PopoverIndicator.vue'

const PopoverArrow = createArrow(ArkPopoverArrow, ArkPopoverArrowTip)

export const Popover = withCompoundParts(PopoverRoot, {
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
}
export * from './props'
