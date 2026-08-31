import type { VariantProps } from '../../utils/tv'
import { tv } from '../../utils/tv'
import { collapsibleMotionVariants } from './motion'

const prefix = 'rui-collapsible'

/**
 * @color razer/components/collapsible.css
 */
export const tvCollapsible = tv(
  {
    slots: {
      root: [],
      trigger: ['w-fit flex items-center'],
      indicator: ['[&_svg]:size-[0.75lh]'],
      content: ['overflow-hidden'],
    },
    variants: {
      motion: collapsibleMotionVariants,
      size: {
        xs: {
          trigger: ['text-xs gap-3'],
        },
        sm: {
          trigger: ['text-sm gap-4'],
        },
        base: {
          trigger: ['text-base gap-4.5'],
        },
        lg: {
          trigger: ['text-lg gap-5'],
        },
      },
    },
    defaultVariants: {
      motion: 'default',
    },
  },
  { prefix, slots: { indicator: `${prefix}-trigger-indicator` } },
)
export type CollapsibleVariants = VariantProps<typeof tvCollapsible>
export const tvReadMore = tv(
  {
    slots: {
      root: '',
      content: '',
      trigger: '',
    },
  },
  'rui-readmore',
)
export type ReadMoreVariants = VariantProps<typeof tvReadMore>
