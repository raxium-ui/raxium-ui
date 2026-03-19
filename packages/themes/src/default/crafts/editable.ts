import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
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
      {
        size: 'xs',
        class: {
          root: 'text-xs',
        },
      },
      {
        size: 'sm',
        class: {
          root: 'text-sm',
        },
      },
      {
        size: 'base',
        class: {
          root: 'text-base',
        },
      },
      {
        size: 'lg',
        class: {
          root: 'text-lg',
        },
      },
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
      {
        size: 'xs',
        class: {
          root: 'px-1 py-0.25',
          clearable: 'text-xs size-[1lh]',
        },
      },
      {
        size: 'sm',
        class: {
          root: 'px-1 py-0.5',
          clearable: 'text-sm size-[1lh]',
        },
      },
      {
        size: 'base',
        class: {
          root: 'px-2 py-0.75',
          clearable: 'text-base size-[1lh]',
        },
      },
      {
        size: 'lg',
        class: {
          root: 'px-2 py-1',
          clearable: 'text-lg size-[1lh]',
        },
      },
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
