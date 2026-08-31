import { withCompoundParts } from '../../utils/withCompoundParts'
import ToggleGroupRoot from './ToggleGroup.vue'
import ToggleGroupItem from './ToggleGroupItem.vue'

export const ToggleGroup = withCompoundParts(ToggleGroupRoot, {
  Item: ToggleGroupItem,
})

export { ToggleGroupItem }
export * from './props'
