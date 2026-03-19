import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-popover'

export const tvPopover = tv(
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
      close: 'inline-flex w-fit items-center justify-center',
      indicator: [
        'data-[state=open]:motion-rotate-out-180',
        'data-[state=closed]:motion-rotate-in-180',
      ],
    },
    variants: {
      size: {
        xs: {
          contentInner: 'px-1.5 py-0.5 text-xs',
          close: 'p-1 text-xs',
          indicator: 'text-xs',
        },
        sm: {
          contentInner: 'px-2 py-1 text-sm',
          close: 'p-1.5 text-sm',
          indicator: 'text-sm',
        },
        base: {
          contentInner: 'px-2.5 py-1.5 text-base',
          close: 'p-2 text-base',
          indicator: 'text-base',
        },
        lg: {
          contentInner: 'px-3 py-2 text-lg',
          close: 'p-2.5 text-lg',
          indicator: 'text-lg',
        },
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
  },
  {
    slots: {
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
      close: `${prefix}-close`,
      indicator: `${prefix}-indicator`,
    },
  },
)

export type PopoverVariants = VariantProps<typeof tvPopover>
