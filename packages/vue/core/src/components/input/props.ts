import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface InputProps extends ThemeCrafts<'tvInput'> {
  id?: string
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes['class']
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  ui?: {
    root?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
    clearable?: HTMLAttributes['class']
  }
}
