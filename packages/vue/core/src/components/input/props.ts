import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface InputProps extends ThemeCrafts<'tvInput'> {
  id?: string
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes['class']
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  ui?: {
    root?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
    clearable?: HTMLAttributes['class']
  }
}
