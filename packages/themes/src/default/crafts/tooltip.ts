import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
import { POPOVER_MOTION } from './_shared'

const prefix = 'rui-tooltip'

export const tvTooltip = tv(
  {
    slots: {
      content: [
        'rounded-(--border-radius)',
        ...POPOVER_MOTION,
      ],
      contentInner: ['relative', 'rounded-(--border-radius)', 'z-10'],
    },
    variants: {
      size: {
        xs: {
          contentInner: 'px-1.5 py-0.5 text-xs',
        },
        sm: {
          contentInner: 'px-2 py-1 text-sm',
        },
        base: {
          contentInner: 'px-2.5 py-1.5 text-base',
        },
        lg: {
          contentInner: 'px-3 py-2 text-lg',
        },
      },
      bordered: {
        true: {
          content: 'border',
        },
        false: {
          content: 'border-none',
        },
      },
    },
    defaultVariants: {
      size: 'base',
      bordered: true,
    },
  },
  {
    slots: {
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
    },
  },
)

export type TooltipVariants = VariantProps<typeof tvTooltip>
