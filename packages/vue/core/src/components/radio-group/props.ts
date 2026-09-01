import type { RadioGroupItemBaseProps, RadioGroupRootBaseProps } from '@ark-ui/vue'
import type { RadioGroupVariants } from '@raxium/themes/default'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export type RadioGroupValueType = string | number | symbol | bigint | null

export interface ValueChangeDetails<T extends RadioGroupValueType = RadioGroupValueType> {
  value: T
}

export interface RadioGroupProps<T extends RadioGroupValueType = RadioGroupValueType>
  extends Omit<RadioGroupRootBaseProps, 'modelValue' | 'defaultValue'>,
  ThemeCrafts<'tvRadioGroup'> {
  class?: HTMLAttributes['class']
  modelValue?: T
  defaultValue?: T
  label?: string
  ui?: {
    root?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
  }
}

export interface RadioGroupRootEmits<T extends RadioGroupValueType = RadioGroupValueType> {
  /**
   * Function called once a radio is checked
   */
  'valueChange': [details: ValueChangeDetails<T>]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: T]
}

export interface RadioGroupItemProps extends Omit<RadioGroupItemBaseProps, 'value'>, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  text?: string
  variant?: RadioGroupVariants['variant']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    text?: HTMLAttributes['class']
  }
  value: RadioGroupValueType
}

export interface RadioGroupLayoutProps {
  class?: HTMLAttributes['class']
  layout?: 'stack' | 'inline'
}
