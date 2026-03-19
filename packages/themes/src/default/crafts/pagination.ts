import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-pagination'

export const tvPagination = tv(
  {
    slots: {
      root: 'flex items-center gap-2',
      control: 'flex items-center gap-2',
      item: ['inline-flex', 'items-center', 'justify-center', 'transition-all', 'rounded'],
      ellipsis: 'inline-flex items-center justify-center',
    },

    variants: {
      size: {
        xs: {
          item: ['h-6', 'min-w-6', 'text-xs'],
          ellipsis: 'size-6',
        },
        sm: {
          item: ['h-8', 'min-w-8', 'text-sm'],
          ellipsis: 'size-8',
        },
        base: {
          item: ['h-10', 'min-w-10', 'text-base'],
          ellipsis: 'size-10',
        },
        lg: {
          item: ['h-12', 'min-w-12', 'text-lg'],
          ellipsis: 'size-12',
        },
      },
    },

    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: prefix,
      control: `${prefix}-control`,
      item: `${prefix}-item`,
      ellipsis: `${prefix}-ellipsis`,
    },
  },
)

export type PaginationVariants = VariantProps<typeof tvPagination>

export const tvPaginationGoto = tv(
  {
    slots: {
      root: 'flex items-center gap-2',
      input: ['[&_[data-part="input"]]:px-0 [&_[data-part="input"]]:text-center'],
    },
    variants: {
      size: {
        xs: {
          input: 'text-xs size-6',
        },
        sm: {
          input: 'text-sm size-8',
        },
        base: {
          input: 'text-base size-10',
        },
        lg: {
          input: 'text-lg size-12',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: `${prefix}-goto`,
      input: `${prefix}-goto-input`,
    },
  },
)
export type PaginationGotoVariants = VariantProps<typeof tvPaginationGoto>

export const tvPaginationPageSize = tv(
  {
    slots: {
      root: 'flex items-center gap-2',
      control: '',
      trigger: 'min-w-0',
      value: '',
      content: '',
      item: '',
    },
    variants: {
      size: {
        xs: '',
        sm: '',
        base: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: `${prefix}-page-size`,
      control: `${prefix}-page-size-control`,
      trigger: `${prefix}-page-size-trigger`,
      value: `${prefix}-page-size-value`,
      content: `${prefix}-page-size-content`,
      item: `${prefix}-page-size-item`,
    },
  },
)
export type PaginationPageSizeVariants = VariantProps<typeof tvPaginationPageSize>
