import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-toast'

export const tvToast = tv(
  {
    slots: {
      root: ['group/toast'],
      content: ['flex', 'items-center', 'border-l-3', 'rounded-md'],
      inner: 'flex flex-col w-max',
      title: '',
      description: '',
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
          title: 'text-sm',
          description: 'text-xs',
        },
        sm: {
          content: 'py-4 px-6 space-x-4',
          inner: 'gap-1',
          icon: 'text-base',
          close: 'text-sm',
          title: 'text-base',
          description: 'text-sm',
        },
        base: {
          content: 'py-5 px-8 space-x-5',
          inner: 'gap-1.5',
          icon: 'text-base',
          close: 'text-base',
          title: 'text-lg',
          description: 'text-base',
        },
        lg: {
          content: 'py-6 px-10 space-x-6',
          inner: 'gap-2',
          icon: 'text-lg',
          close: 'text-base',
          title: 'text-lg',
          description: 'text-base',
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
      inner: `${prefix}-inner`,
      title: `${prefix}-title`,
      description: `${prefix}-description`,
      icon: `${prefix}-icon`,
      close: `${prefix}-close`,
    },
  },
)

export type ToastVariants = VariantProps<typeof tvToast>
