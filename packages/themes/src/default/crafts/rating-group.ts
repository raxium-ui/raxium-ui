import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/rating-group.css
 */
export const tvRatingGroup = tv(
  {
    slots: {
      root: '',
      control: ['flex', 'items-center', 'gap-0.5'],
      item: ['inline-flex', 'items-center', 'justify-center', 'outline-none', 'size-[1lh]'],
      itemIndicator: ['relative', 'size-[87.5%]'],
      itemIndicatorIcon: ['absolute', 'block', 'size-full'],
    },
    variants: {
      size: {
        xs: {
          control: 'text-xs',
        },
        sm: {
          control: 'text-sm',
        },
        base: {
          control: 'text-base',
        },
        lg: {
          control: 'text-lg',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  'rui-rating-group',
)

export type RatingGroupVariants = VariantProps<typeof tvRatingGroup>
