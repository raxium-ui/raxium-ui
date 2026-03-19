import {
  PopoverArrow as ArkPopoverArrow,
  PopoverArrowTip as ArkPopoverArrowTip,
} from '@ark-ui/vue/popover'
import { createArrow } from '@raxium/vue/components/arrow/createArrow'

export { default as Popover } from './Popover.vue'
export { default as PopoverClose } from './PopoverClose.vue'
export { default as PopoverContent } from './PopoverContent.vue'
export { default as PopoverIndicator } from './PopoverIndicator.vue'

export * from './props'
export {
  PopoverCloseTrigger,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@ark-ui/vue/popover'
const PopoverArrow = createArrow(ArkPopoverArrow, ArkPopoverArrowTip)
export { PopoverArrow }
