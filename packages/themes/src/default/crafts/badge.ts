import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-badge'

export const tvBadge = tv(
  {
    base: [
      'inline-flex',
      'items-center',
      'rounded',
      'uppercase',
      'outline-none',
      'transition-colors',
    ],
    variants: {
      variant: {
        default: '',
        secondary: '',
        dot: ['rounded-full', '-top-[.5em]', '-right-[.5em]'],
      },
      size: {
        xs: ['text-3xs', 'py-0.25', 'px-1'],
        sm: ['text-2xs', 'py-0.25', 'px-1'],
        base: ['text-xs', 'py-0.5', 'px-1.25'],
        lg: ['text-sm', 'py-0.5', 'px-1.5'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
    },
    compoundVariants: [
      {
        variant: 'dot',
        size: 'base',
        class: ['p-0', 'size-[.375rem]'],
      },
      {
        variant: 'dot',
        size: 'sm',
        class: ['p-0', 'size-[.25rem]'],
      },
      {
        variant: 'dot',
        size: 'lg',
        class: ['p-0', 'size-[.5rem]'],
      },
    ],
  },
  {
    class: prefix,
  },
)

export type BadgeVariants = VariantProps<typeof tvBadge>
