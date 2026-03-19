import type { RadioGroupItemBaseProps, RadioGroupRootBaseProps } from '@ark-ui/vue'
import type { RadioGroupVariants } from '@raxium/themes/default'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export type RadioGroupValueType = string | number | symbol | bigint | null
interface ValueChangeDetails {
  value: RadioGroupValueType
}
export interface RadioGroupProps
  extends Omit<RadioGroupRootBaseProps, 'modelValue' | 'defaultValue'>,
  ThemeCrafts<'tvRadioGroup'> {
  class?: HTMLAttributes['class']
  modelValue?: RadioGroupValueType
  defaultValue?: RadioGroupValueType
}

export interface RadioGroupRootEmits {
  /**
   * Function called once a radio is checked
   */
  'valueChange': [details: ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: ValueChangeDetails['value']]
}

export interface RadioGroupItemProps extends Omit<RadioGroupItemBaseProps, 'value'>, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  label?: string
  variant?: RadioGroupVariants['variant']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    text?: HTMLAttributes['class']
  }
  value: RadioGroupValueType
}
