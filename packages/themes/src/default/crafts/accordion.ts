import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
import { COLLAPSIBLE_CONTENT_MOTION, COLLAPSIBLE_INDICATOR } from './_shared'

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
      indicator: [
        ...COLLAPSIBLE_INDICATOR,
        '[&_svg]:size-[0.75lh]',
      ],
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

export type AccordionVariants = VariantProps<typeof tvAccordion>
