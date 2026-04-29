import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-spin'

export const tvSpin = tv(
  {
    slots: {
      /** Mode + stacking context; wraps mask + indicator (children use absolute fills / center within this box). */
      positioner: ['isolate'],
      mask: ['absolute', 'inset-0'],
      indicator: [
        'absolute',
        'top-1/2',
        'left-1/2',
        'transform',
        'translate-x-[-50%]',
        'translate-y-[-50%]',
        'z-auto',
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
          positioner: ['fixed', 'top-0', 'left-0', 'w-screen', 'h-screen', 'z-(--z-loading)'],
        },
        inline: {
          positioner: ['absolute', 'inset-0'],
        },
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
      positioner: `${prefix}-positioner`,
      mask: `${prefix}-mask`,
      indicator: `${prefix}-indicator`,
      icon: `${prefix}-icon`,
      text: `${prefix}-text`,
    },
  },
)

export interface SpinVariants extends VariantProps<typeof tvSpin> {}
