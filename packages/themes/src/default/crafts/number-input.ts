import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/number-input.css
 */
export const tvNumberInput = tv(
  {
    slots: {
      root: '',
      control: '',
      input: '',
      triggerGroup: 'flex flex-col',
      trigger: '[&>svg]:size-full',
    },
    variants: {
      size: {
        xs: {
          input: 'text-xs',
          trigger: 'h-2 w-6 [&>svg]:size-full',
        },
        sm: {
          input: 'text-sm',
          trigger: 'h-2.5 w-6 [&>svg]:size-full',
        },
        base: {
          input: 'text-base',
          trigger: 'h-3 w-6 [&>svg]:size-full',
        },
        lg: {
          input: 'text-lg',
          trigger: 'h-3.5 w-6 [&>svg]:size-full',
        },
      },
    },

    defaultVariants: {
      size: 'base',
    },
  },
  'rui-number-input',
)

export type NumberInputVariants = VariantProps<typeof tvNumberInput>
