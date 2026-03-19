import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-rating-group'

export const tvRatingGroup = tv(
  {
    slots: {
      root: '',
      control: ['flex', 'items-center', 'gap-0.5'],
      item: ['inline-flex', 'outline-none'],
      itemIndicator: ['relative'],
      itemIndicatorIcon: ['absolute', 'block', 'size-full'],
    },
    variants: {
      size: {
        xs: {
          itemIndicator: 'size-3',
        },
        sm: {
          itemIndicator: 'size-3.5',
        },
        base: {
          itemIndicator: 'size-4',
        },
        lg: {
          itemIndicator: 'size-4.5',
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
      itemIndicator: `${prefix}-item-indicator`,
      itemIndicatorIcon: `${prefix}-item-indicator-icon`,
    },
  },
)

export type RatingGroupVariants = VariantProps<typeof tvRatingGroup>
