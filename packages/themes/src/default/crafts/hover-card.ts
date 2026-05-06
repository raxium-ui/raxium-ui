import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
import { POPOVER_MOTION } from './_shared'

const prefix = 'rui-hover-card'

export const tvHoverCard = tv(
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
        xs: '',
        sm: '',
        base: '',
        lg: '',
      },
      bordered: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      size: 'base',
      bordered: true,
    },
    compoundVariants: [
      {
        size: 'xs',
        class: {
          contentInner: 'px-1.5 py-0.5 text-xs',
        },
      },
      {
        size: 'sm',
        class: {
          contentInner: 'px-2 py-1 text-sm',
        },
      },
      {
        size: 'base',
        class: {
          contentInner: 'px-2.5 py-1.5 text-base',
        },
      },
      {
        size: 'lg',
        class: {
          contentInner: 'px-3 py-2 text-lg',
        },
      },
      {
        bordered: true,
        class: {
          content: 'border',
        },
      },
    ],
  },
  {
    slots: {
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
    },
  },
)

export type HoverCardVariants = VariantProps<typeof tvHoverCard>
