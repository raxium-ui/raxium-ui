import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'
import type { CheckboxGroupBaseProps, CheckboxRootBaseProps } from './checkbox'

export type CheckedState = boolean | 'indeterminate'
export type CheckboxValueType = string | number | symbol | bigint | null

export interface CheckboxProps
  extends Omit<CheckboxRootBaseProps, 'value'>,
  ThemeCrafts<'tvCheckbox'> {
  label?: string
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
  }
  value?: CheckboxValueType
}

export interface CheckboxGroupProps<T extends CheckboxValueType = CheckboxValueType>
  extends Omit<CheckboxGroupBaseProps, 'modelValue' | 'defaultValue'>,
  ThemeNoCrafts {
  class?: HTMLAttributes['class']
  modelValue?: T[]
  defaultValue?: T[]
}

export interface CheckboxGroupRootEmits<T extends CheckboxValueType = CheckboxValueType> {
  /**
   * Functional called when the value changes.
   */
  'valueChange': [value: T[]]
  'update:modelValue': [value: T[]]
}
