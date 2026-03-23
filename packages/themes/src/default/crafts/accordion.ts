import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-accordion'

/** 结构与 tvCollapsible 对齐：root / trigger / indicator / content，并增加 item 包裹层 */
export const tvAccordion = tv({
  slots: {
    root: [],
    item: [],
    trigger: ['w-fit flex items-center'],
    indicator: [
      'data-[state=closed]:rotate-0',
      'data-[state=open]:rotate-180',
      'transition-transform',
    ],
    content: [
      'overflow-hidden',
      'data-[state=open]:animate-collapsible-down',
      'data-[state=closed]:animate-collapsible-up',
    ],
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
}, {
  slots: {
    root: prefix,
    item: `${prefix}-item`,
    trigger: `${prefix}-trigger`,
    indicator: `${prefix}-trigger-indicator`,
    content: `${prefix}-content`,
  },
})

export type AccordionVariants = VariantProps<typeof tvAccordion>
