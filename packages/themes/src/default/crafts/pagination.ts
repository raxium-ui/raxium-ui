import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-pagination'

/**
 * @color razer/components/pagination.css
 */
export const tvPagination = tv(
  {
    slots: {
      root: 'flex items-center gap-2',
      control: 'flex items-center gap-2',
      item: [
        'inline-flex',
        'items-center',
        'justify-center',
        'transition-all',
        'rounded',
        '[&_svg]:size-[1lh]',
      ],
      ellipsis: 'inline-flex items-center justify-center',
    },

    variants: {
      size: {
        xs: {
          item: ['h-6', 'min-w-6', 'text-xs'],
          ellipsis: 'size-6',
        },
        sm: {
          item: ['h-7', 'min-w-7', 'text-sm'],
          ellipsis: 'size-7',
        },
        base: {
          item: ['h-8', 'min-w-8', 'text-base'],
          ellipsis: 'size-8',
        },
        lg: {
          item: ['h-10', 'min-w-10', 'text-lg'],
          ellipsis: 'size-10',
        },
      },
    },

    defaultVariants: {
      size: 'base',
    },
  },
  prefix,
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
          input: 'text-xs w-8',
        },
        sm: {
          input: 'text-sm w-9',
        },
        base: {
          input: 'text-base w-10',
        },
        lg: {
          input: 'text-lg w-12',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  `${prefix}-goto`,
)
export type PaginationGotoVariants = VariantProps<typeof tvPaginationGoto>

export const tvPaginationPageSize = tv(
  {
    slots: {
      root: 'flex items-center gap-2',
      control: '',
      trigger: ['min-w-0', 'justify-center'],
      value: 'text-center',
      content: '',
      item: 'justify-center',
    },
    variants: {
      size: {
        xs: {
          trigger: 'text-xs gap-1',
        },
        sm: {
          trigger: 'text-sm gap-1.5',
        },
        base: {
          trigger: 'text-base gap-2',
        },
        lg: {
          trigger: 'text-lg gap-2.5',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  `${prefix}-page-size`,
)
export type PaginationPageSizeVariants = VariantProps<typeof tvPaginationPageSize>
