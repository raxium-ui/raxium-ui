import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/pin-input.css
 */
export const tvPinInput = tv(
  {
    slots: {
      root: ['flex', 'flex-col', 'gap-1.5'],
      label: ['font-medium'],
      control: ['flex', 'items-center', 'gap-2'],
      input: [
        'flex',
        'items-center',
        'justify-center',
        'text-center',
        'border',
        'rounded',
        'transition-all',
        'focus:outline-none',
        'data-[disabled]:pointer-events-none',
        'data-[disabled]:opacity-(--disabled-opacity)',
      ],
      separator: ['flex', 'items-center', 'text-current', 'select-none'],
    },
    variants: {
      size: {
        xs: {
          label: 'text-xs',
          input: 'w-6 h-6 text-xs',
          separator: 'text-xs',
        },
        sm: {
          label: 'text-sm',
          input: 'w-7 h-7 text-sm',
          separator: 'text-sm',
        },
        base: {
          label: 'text-base',
          input: 'w-8 h-8 text-base',
          separator: 'text-base',
        },
        lg: {
          label: 'text-base',
          input: 'w-10 h-10 text-lg',
          separator: 'text-lg',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  'rui-pin-input',
)

export type PinInputVariants = VariantProps<typeof tvPinInput>
