import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
import { COLLAPSIBLE_CONTENT_MOTION, COLLAPSIBLE_INDICATOR } from './_shared'

const prefix = 'rui-collapsible'

/**
 * @color razer/components/collapsible.css
 */
export const tvCollapsible = tv(
  {
    slots: {
      root: [],
      trigger: ['w-fit flex items-center'],
      indicator: [...COLLAPSIBLE_INDICATOR, '[&_svg]:size-[0.75lh]'],
      content: [...COLLAPSIBLE_CONTENT_MOTION],
    },
    variants: {
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
  },
  { prefix, slots: { indicator: `${prefix}-trigger-indicator` } },
)
export type CollapsibleVariants = VariantProps<typeof tvCollapsible>
export const tvReadMore = tv(
  {
    slots: {
      root: [],
      content: [],
      trigger: [],
    },
  },
  'rui-readmore',
)
export type ReadMoreVariants = VariantProps<typeof tvReadMore>
