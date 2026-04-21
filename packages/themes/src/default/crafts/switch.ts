import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-switch'

export const tvSwitch = tv({
  slots: {
    root: [
      'inline-flex',
      'items-center',
      'gap-2',
      'w-fit',
      'group/switch',
      'relative',
    ],
    control: [
      'block',
      'shrink-0',
      'rounded-full',
      'border-2',
      'transition-colors',
      'disabled:opacity-(--disabled-opacity)',
    ],
    thumb: [
      'pointer-events-none',
      'block',
      'size-3.5',
      'rounded-full',
      'origin-center',
      'transition-transform',
      'data-[state=checked]:translate-x-full',
      'data-[state=unchecked]:translate-x-0',
    ],
    label: '',
  },
  variants: {
    size: {
      xs: {
        control: 'w-7 h-4',
        thumb: 'size-3',
        label: 'text-xs',
      },
      sm: {
        control: 'w-8 h-4.5',
        thumb: 'size-3.5',
        label: 'text-sm',
      },
      base: {
        control: 'w-9 h-5',
        thumb: 'size-4',
        label: 'text-base',
      },
      lg: {
        control: 'w-10 h-5.5',
        thumb: 'size-4.5',
        label: 'text-lg',
      },
    },
  },
  defaultVariants: {
    size: 'base',
  },
}, {
  slots: {
    root: prefix,
    control: `${prefix}-control`,
    thumb: `${prefix}-thumb`,
    label: `${prefix}-label`,
  },
})

export type SwitchVariants = VariantProps<typeof tvSwitch>
