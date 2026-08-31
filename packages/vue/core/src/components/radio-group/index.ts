import { withCompoundParts } from '../../utils/withCompoundParts'
import RadioGroupRoot from './RadioGroup.vue'
import RadioGroupItem from './RadioGroupItem.vue'
import RadioGroupLayout from './RadioGroupLayout.vue'

export const RadioGroup: typeof RadioGroupRoot & {
  Item: typeof RadioGroupItem
  Layout: typeof RadioGroupLayout
} = withCompoundParts(RadioGroupRoot, {
  Item: RadioGroupItem,
  Layout: RadioGroupLayout,
})

export { RadioGroupItem, RadioGroupLayout }
export * from './props'
