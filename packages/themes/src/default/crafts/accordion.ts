import type { VariantProps } from '../../utils/tv'
import { tv } from '../../utils/tv'
import { collapsibleMotionVariants } from './motion'

const prefix = 'rui-accordion'

/**
 * @color razer/components/accordion.css
 */
/** 结构与 tvCollapsible 对齐：root / trigger / indicator / content，并增加 item 包裹层 */
export const tvAccordion = tv(
  {
    slots: {
      root: [],
      item: [],
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

export type AccordionVariants = VariantProps<typeof tvAccordion>
