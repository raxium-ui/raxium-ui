import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-hover-card'

export const tvHoverCard = tv(
  {
    slots: {
      content: [
        'rounded-(--border-radius)',
        'data-[state=open]:motion-opacity-in',
        'data-[state=open]:motion-scale-in-95',
        'data-[state=open]:data-[placement^=bottom]:motion-translate-y-in-[.25rem]',
        'data-[state=open]:data-[placement^=top]:-motion-translate-y-in-[.25rem]',
        'data-[state=open]:data-[placement^=left]:-motion-translate-x-in-[.25rem]',
        'data-[state=open]:data-[placement^=right]:motion-translate-x-in-[.25rem]',
        'data-[state=closed]:motion-opacity-out',
        'data-[state=closed]:motion-scale-out-95',
        'data-[state=closed]:data-[placement^=bottom]:motion-translate-y-out-[.25rem]',
        'data-[state=closed]:data-[placement^=top]:-motion-translate-y-out-[.25rem]',
        'data-[state=closed]:data-[placement^=left]:-motion-translate-x-out-[.25rem]',
        'data-[state=closed]:data-[placement^=right]:motion-translate-x-out-[.25rem]',
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
