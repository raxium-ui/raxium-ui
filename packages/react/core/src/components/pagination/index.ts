import {
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  usePaginationContext,
} from '@ark-ui/react/pagination'
import { PaginationRoot } from './Pagination'
import { PaginationGoTo } from './PaginationGoTo'
import { PaginationGoToTrigger } from './PaginationGoToTrigger'
import { PaginationPageSize } from './PaginationPageSize'

export const Pagination = Object.assign(PaginationRoot, {
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
  usePaginationContext,
}

export type {
  PaginationGoToProps,
  PaginationGoToTriggerProps,
  PaginationPageSizeProps,
  PaginationProps,
} from './props'
