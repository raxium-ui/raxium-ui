import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-input'

export const tvInput = tv({
  slots: {
    root: [
      'flex',
      'items-center',
      'min-w-0',
      'border',
      'rounded',
      'transition-all',
      'data-[state=disabled]:pointer-events-none',
      'data-[state=disabled]:opacity-(--disabled-opacity)',
    ],
    input: ['flex-1', 'w-0'],
    clearable: ['size-[1lh]', 'flex', 'items-center', 'justify-center'],
  },
  variants: {
    size: {
      xs: {
        root: 'px-2 py-1 gap-1.5 text-xs',
        input: 'placeholder:text-xs',
      },
      sm: {
        root: 'px-2 py-1.5 gap-2 text-sm',
        input: 'placeholder:text-sm',
      },
      base: {
        root: 'px-2 py-2 gap-2.5 text-base',
        input: 'placeholder:text-base',
      },
      lg: {
        root: 'px-2 py-2.5 gap-3 text-lg',
        input: 'placeholder:text-lg',
      },
    },
  },
  defaultVariants: { size: 'base' },
}, {
  slots: {
    root: prefix,
    input: `${prefix}-input`,
    clearable: `${prefix}-clearable`,
  },
})

export type InputVariants = VariantProps<typeof tvInput>
