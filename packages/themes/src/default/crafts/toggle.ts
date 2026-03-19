import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-toggle'

export const tvToggle = tv({
  base: [
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
  variants: {
    size: {
      xs: 'h-6 text-xs gap-1.5 px-3',
      sm: 'h-7 text-sm gap-2.5 px-4',
      base: 'h-8 text-base gap-3 px-5',
      lg: 'h-9 text-lg gap-3.5 px-6',
    },
  },
  defaultVariants: {
    size: 'base',
  },
}, {
  class: prefix,
})

export type ToggleVariants = VariantProps<typeof tvToggle>
