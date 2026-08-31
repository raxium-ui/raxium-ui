import {
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@ark-ui/vue/pagination'
import { withCompoundParts } from '../../utils/withCompoundParts'
import PaginationRoot from './Pagination.vue'
import PaginationGoTo from './PaginationGoTo.vue'
import PaginationGoToTrigger from './PaginationGoToTrigger.vue'
import PaginationPageSize from './PaginationPageSize.vue'

export const Pagination = withCompoundParts(PaginationRoot, {
  PrevTrigger: PaginationPrevTrigger,
  NextTrigger: PaginationNextTrigger,
  Item: PaginationItem,
  Ellipsis: PaginationEllipsis,
  GoTo: PaginationGoTo,
  GoToTrigger: PaginationGoToTrigger,
  PageSize: PaginationPageSize,
})

export {
  PaginationGoTo,
  PaginationGoToTrigger,
  PaginationPageSize,
}
export * from './props'
