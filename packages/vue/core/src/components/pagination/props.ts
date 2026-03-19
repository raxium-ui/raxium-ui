import type { PaginationRootBaseProps, PolymorphicProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export const PAGINATION_GO_TO_PROVIDE_KEY = Symbol('PAGINATION_GO_TO_PROVIDE_KEY')

export interface PaginationProps extends PaginationRootBaseProps, ThemeCrafts<'tvPagination'> {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    firstPage?: HTMLAttributes['class']
    prevPage?: HTMLAttributes['class']
    nextPage?: HTMLAttributes['class']
    lastPage?: HTMLAttributes['class']
    item?: HTMLAttributes['class']
    ellipsis?: HTMLAttributes['class']
  }
}

export interface PaginationGoToProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
  }
}

export interface PaginationGoToTriggerProps extends PolymorphicProps {}

export interface PaginationPageSizeProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  sizes?: number[]
  placeholder?: string
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    trigger?: HTMLAttributes['class']
    value?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    item?: HTMLAttributes['class']
  }
}
