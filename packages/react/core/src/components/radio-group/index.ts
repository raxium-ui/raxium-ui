import { useRadioGroupContext, useRadioGroupItemContext } from '@ark-ui/react/radio-group'
import { RadioGroupRoot } from './RadioGroup'
import { RadioGroupItem } from './RadioGroupItem'
import { RadioGroupLayout } from './RadioGroupLayout'

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
  Layout: RadioGroupLayout,
})

export { RadioGroupItem, RadioGroupLayout, useRadioGroupContext, useRadioGroupItemContext }
export type {
  RadioGroupItemProps,
  RadioGroupLayoutProps,
  RadioGroupProps,
  RadioGroupValueType,
  ValueChangeDetails,
} from './props'
