import type { VariantProps } from '../../utils'
import { mapVariant, tv } from '../../utils'
import { tvInput } from './input'

const prefix = 'rui-editable'

/**
 * @color razer/components/editable.css
 */
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
  }, prefix,
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
  }, `${prefix}-input`,
)

export type EditableVariants = VariantProps<typeof tvEditable>
export type EditableInputVariants = VariantProps<typeof tvEditableInput>
