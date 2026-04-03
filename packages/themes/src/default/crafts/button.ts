import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-btn'

export const tvButton = tv(
  {
    slots: {
      root: [
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded',
        'border',
        'transition-all',
        'disabled:pointer-events-none',
        'disabled:opacity-(--disabled-opacity)',
        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
      ],
      loading: 'size-[1lh] animate-spin',
    },
    variants: {
      variant: {
        solid: '',
        outlined: '',
        filled: '',
        text: '',
        link: '',
        icon: '',
      },
      color: {
        primary: '',
        default: '',
        danger: '',
        warning: '',
        info: '',
      },
      size: {
        xs: {
          root: 'h-6 px-3 gap-1.5 text-xs',
        },
        sm: {
          root: 'h-7 px-4 gap-2 text-sm',
        },
        base: {
          root: 'h-8 px-5 gap-2.5 text-base',
        },
        lg: {
          root: 'h-9 px-6 gap-3 text-lg',
        },
      },
      loading: {
        true: {
          root: 'pointer-events-none',
        },
        false: '',
      },
    },

    compoundVariants: [
      {
        variant: 'icon',
        class: {
          root: 'p-0 aspect-square border-none',
        },
      },
    ],

    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'base',
      loading: false,
    },
  },
  {
    slots: {
      root: prefix,
      loading: `${prefix}-loading`,
    },
  },
)

export type ButtonVariants = VariantProps<typeof tvButton>
