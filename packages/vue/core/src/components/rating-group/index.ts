import { withCompoundParts } from '../../utils/withCompoundParts'
import RatingGroupRoot from './RatingGroup.vue'
import RatingGroupItem from './RatingGroupItem.vue'

export const RatingGroup = withCompoundParts(RatingGroupRoot, {
  Item: RatingGroupItem,
})

export { RatingGroupItem }
export * from './props'
