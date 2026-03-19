import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-collapsible'

export const tvCollapsible = tv({
  slots: {
    root: [],
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
    trigger: `${prefix}-trigger`,
    indicator: `${prefix}-trigger-indicator`,
    content: `${prefix}-content`,
  },
})
export type CollapsibleVariants = VariantProps<typeof tvCollapsible>

const readMorePrefix = 'rui-readmore'
export const tvReadMore = tv({
  slots: {
    root: [],
    content: [],
    trigger: [],
  },
}, {
  slots: {
    root: readMorePrefix,
    content: `${readMorePrefix}-content`,
    trigger: `${readMorePrefix}-trigger`,
  },
})
export type ReadMoreVariants = VariantProps<typeof tvReadMore>
