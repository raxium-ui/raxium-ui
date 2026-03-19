import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-message'

export const tvMessage = tv(
  {
    slots: {
      root: ['group/message'],
      content: ['flex', 'items-center', 'rounded-md'],
      description: 'w-max',
      icon: 'size-[1lh]',
      close: '',
    },
    variants: {
      size: {
        xs: {
          content: 'py-3 px-4 space-x-3',
          inner: 'gap-0.5',
          icon: 'text-sm',
          close: 'text-xs',
          title: 'text-xs',
          description: 'text-xs',
        },
        sm: {
          content: 'py-4 px-6 space-x-4',
          inner: 'gap-1',
          icon: 'text-base',
          close: 'text-sm',
          title: 'text-sm',
          description: 'text-sm',
        },
        base: {
          content: 'py-5 px-8 space-x-5',
          inner: 'gap-1.5',
          icon: 'text-lg',
          close: 'text-base',
          title: 'text-base',
          description: 'text-base',
        },
        lg: {
          content: 'py-6 px-10 space-x-6',
          inner: 'gap-2',
          icon: 'text-xl',
          close: 'text-lg',
          title: 'text-lg',
          description: 'text-lg',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: prefix,
      content: `${prefix}-content`,
      description: `${prefix}-description`,
      icon: `${prefix}-icon`,
      close: `${prefix}-close`,
    },
  },
)

export type MessageVariants = VariantProps<typeof tvMessage>
