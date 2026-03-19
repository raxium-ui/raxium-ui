import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-spin'

export const tvSpin = tv(
  {
    slots: {
      root: '',
      mask: ['absolute', 'top-0', 'left-0', 'size-full'],
      indicator: [
        'absolute',
        'top-1/2',
        'left-1/2',
        'transform',
        'translate-x-[-50%]',
        'translate-y-[-50%]',
        'flex',
        'items-center',
        'justify-center',
        'gap-2',
      ],
      icon: ['inline-block', 'size-6'],
      text: ['text-xs'],
    },
    variants: {
      mode: {
        fullscreen: {
          root: ['fixed', 'top-0', 'left-0', 'w-screen', 'h-screen', 'z-(--z-loading)'],
        },
        inline: ['absolute', 'inset-0'],
      },
      size: {
        xs: {
          icon: ['size-6'],
          text: ['text-xs'],
        },
        sm: {
          icon: ['size-8'],
          text: ['text-sm'],
        },
        base: {
          icon: ['size-10'],
          text: ['text-base'],
        },
        lg: {
          icon: ['size-12'],
          text: ['text-lg'],
        },
      },
    },
  },
  {
    slots: {
      root: prefix,
      mask: `${prefix}-mask`,
      indicator: `${prefix}-indicator`,
      icon: `${prefix}-icon`,
      text: `${prefix}-text`,
    },
  },
)

export interface SpinVariants extends VariantProps<typeof tvSpin> {}
