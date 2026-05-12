import type { VariantProps } from '../../utils'
import { mapVariant, tv } from '../../utils'
import { tvInput } from './input'

const prefix = 'rui-editable'

export const tvEditable = tv(
  {
    slots: {
      root: 'flex items-center',
      area: '',
      preview: '',
    },
    variants: {
      size: {
        xs: '',
        sm: '',
        base: '',
        lg: '',
      },
    },
    compoundVariants: [
      ...mapVariant('size', {
        xs: { root: 'text-xs' },
        sm: { root: 'text-sm' },
        base: { root: 'text-base' },
        lg: { root: 'text-lg' },
      }),
    ],
    defaultVariants: { size: 'base' },
  },
  {
    slots: {
      root: prefix,
      area: `${prefix}-area`,
      preview: `${prefix}-preview`,
    },
  },
)

export const tvEditableInput = tv(
  {
    extend: tvInput,
    slots: {
      root: '',
      input: 'min-w-20 w-fit',
      clearable: '',
    },
    compoundVariants: [
      ...mapVariant('size', {
        xs: { root: 'px-1 py-0.25', clearable: 'text-xs size-[1lh]' },
        sm: { root: 'px-1 py-0.5', clearable: 'text-sm size-[1lh]' },
        base: { root: 'px-2 py-0.75', clearable: 'text-base size-[1lh]' },
        lg: { root: 'px-2 py-1', clearable: 'text-lg size-[1lh]' },
      }),
    ],
  },
  {
    slots: {
      root: `${prefix}-input`,
      input: `${prefix}-input-input`,
      clearable: `${prefix}-input-clearable`,
    },
  },
)

export type EditableVariants = VariantProps<typeof tvEditable>
export type EditableInputVariants = VariantProps<typeof tvEditableInput>
