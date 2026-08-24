import { useRatingGroupContext, useRatingGroupItemContext } from '@ark-ui/react/rating-group'
import { RatingGroupRoot } from './RatingGroup'
import { RatingGroupItem } from './RatingGroupItem'

export const RatingGroup = Object.assign(RatingGroupRoot, {
  Item: RatingGroupItem,
})

export { RatingGroupItem, useRatingGroupContext, useRatingGroupItemContext }
export type { RatingGroupItemProps, RatingGroupProps } from './props'
