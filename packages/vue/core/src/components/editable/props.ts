import type {
  EditableInputBaseProps,
  EditablePreviewBaseProps,
  EditableRootBaseProps,
} from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

// types
export interface EditableProps extends EditableRootBaseProps, ThemeCrafts<'tvEditable'> {
  class?: HTMLAttributes['class']
  clearable?: boolean
  ui?: {
    root?: HTMLAttributes['class']
    area?: HTMLAttributes['class']
  }
}
export interface EditableInputProps extends EditableInputBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  clearable?: boolean
}
export interface EditablePreviewProps extends EditablePreviewBaseProps, ThemeNoCrafts {
  class?: string
}
