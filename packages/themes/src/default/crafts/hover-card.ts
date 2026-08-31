import type { VariantProps } from '../../utils/tv'
import { tv } from '../../utils/tv'
import { mapVariant } from '../../utils/variant-helpers'
import { overlayMotionVariants } from './motion'
/**
 * @color razer/components/hover-card.css
 */
export const tvHoverCard = tv(
  {
    slots: {
      content: ['z-(--rui-z-index)', 'rounded-(--border-radius)'],
      contentInner: ['relative', 'rounded-(--border-radius)', 'z-base'],
    },
    variants: {
      size: {
        xs: '',
        sm: '',
        base: '',
        lg: '',
      },
      bordered: {
        true: {
          content: 'border',
        },
        false: {
          content: 'border-none',
        },
      },
      motion: overlayMotionVariants,
    },
    defaultVariants: {
      size: 'base',
      bordered: true,
      motion: 'default',
    },
    compoundVariants: [
      ...mapVariant('size', {
        xs: { contentInner: 'px-1.5 py-0.5 text-xs' },
        sm: { contentInner: 'px-2 py-1 text-sm' },
        base: { contentInner: 'px-2.5 py-1.5 text-base' },
        lg: { contentInner: 'px-3 py-2 text-lg' },
      }),
    ],
  },
  'rui-hover-card',
)

export type HoverCardVariants = VariantProps<typeof tvHoverCard>
