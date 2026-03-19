import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-number-input'

export const tvNumberInput = tv(
  {
    slots: {
      root: '',
      control: 'p-0',
      input: '',
      triggerGroup: 'flex flex-col',
      trigger: '[&>svg]:size-full',
    },
    variants: {
      size: {
        xs: {
          input: 'text-xs',
          trigger: 'h-3 w-6 [&>svg]:size-full',
        },
        sm: {
          input: 'text-sm',
          trigger: 'h-4 w-8 [&>svg]:size-full',
        },
        base: {
          input: 'text-base',
          trigger: 'h-4.5 w-8 [&>svg]:size-full',
        },
        lg: {
          input: 'text-lg',
          trigger: 'h-5 w-10 [&>svg]:size-full',
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
      control: `${prefix}-control`,
      input: `${prefix}-input`,
      triggerGroup: `${prefix}-trigger-group`,
      trigger: `${prefix}-trigger`,
    },
  },
)

export type NumberInputVariants = VariantProps<typeof tvNumberInput>
