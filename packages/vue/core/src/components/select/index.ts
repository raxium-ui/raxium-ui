import { withCompoundParts } from '../../utils/withCompoundParts'
import SelectRoot from './Select.vue'
import SelectContent from './SelectContent.vue'
import SelectItem from './SelectItem.vue'
import SelectItemGroup from './SelectItemGroup.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'

export const Select: typeof SelectRoot & {
  Trigger: typeof SelectTrigger
  Value: typeof SelectValue
  Content: typeof SelectContent
  Item: typeof SelectItem
  ItemGroup: typeof SelectItemGroup
} = withCompoundParts(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
  ItemGroup: SelectItemGroup,
})

export { SelectContent, SelectItem, SelectItemGroup, SelectRoot, SelectTrigger, SelectValue }
export * from './props'
