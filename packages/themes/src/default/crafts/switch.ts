import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/switch.css
 */
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
      'flex',
      'items-center',
      'shrink-0',
      'rounded-full',
      'border-2',
      'transition-colors',
      'disabled:opacity-(--disabled-opacity)',
    ],
    thumb: [
      'pointer-events-none',
      'block',
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
        control: 'text-xs w-8 h-[calc(4.326*var(--spacing))]',
        thumb: 'size-3.5',
      },
      sm: {
        control: 'text-sm w-9 h-[calc(4.944*var(--spacing))]',
        thumb: 'size-4',
      },
      base: {
        control: 'text-base w-10 h-[calc(5.562*var(--spacing))]',
        thumb: 'size-4.5',
      },
      lg: {
        control: 'text-lg w-11 h-[calc(6.18*var(--spacing))]',
        thumb: 'size-5',
      },
    },
  },
  defaultVariants: {
    size: 'base',
  },
}, 'rui-switch')

export type SwitchVariants = VariantProps<typeof tvSwitch>
