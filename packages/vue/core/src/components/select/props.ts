import type {
  CollectionItem,
  SelectContentBaseProps,
  SelectItemBaseProps,
  SelectItemGroupBaseProps,
  SelectRootBaseProps,
  SelectTriggerBaseProps,
} from '@ark-ui/vue/select'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type * as ZagSelect from '@zag-js/select'
import type { HTMLAttributes } from 'vue'

export type SelectValueType = string | number | boolean | null | symbol | bigint
/** Value stored in `v-model`; kept separate from `highlightedValue`. */
export type SelectModelValueType = SelectValueType
export interface SelectProps<
  T extends CollectionItem,
  V extends SelectModelValueType = string,
>
  extends Omit<SelectRootBaseProps<T>, 'modelValue' | 'defaultValue' | 'highlightedValue'>,
  ThemeCrafts<'tvSelect'> {
  class?: HTMLAttributes['class']
  modelValue?: V[]
  defaultValue?: V[]
  highlightedValue?: string | null
}

// ts-plugin(2742)
export interface SelectEmits<
  T extends CollectionItem,
  V extends SelectModelValueType = string,
> {
  'focusOutside': [event: ZagSelect.FocusOutsideEvent]
  'highlightChange': [details: ZagSelect.HighlightChangeDetails<T>]
  'interactOutside': [event: ZagSelect.InteractOutsideEvent]
  'openChange': [details: ZagSelect.OpenChangeDetails]
  'pointerDownOutside': [event: ZagSelect.PointerDownOutsideEvent]
  'select': [details: ZagSelect.SelectionDetails]
  'valueChange': [details: ZagSelect.ValueChangeDetails<T>]
  'update:modelValue': [value: V[]]
  'update:open': [open: boolean]
  'update:highlightedValue': [value: string | null]
}

export interface SelectContentProps extends SelectContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    root?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}

export interface SelectItemProps extends SelectItemBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}

export interface SelectItemGroupProps extends SelectItemGroupBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  label?: string
  ui?: {
    root?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
  }
}

export interface SelectTriggerProps extends SelectTriggerBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  clearable?: boolean
}

export interface SelectValueProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  placeholder?: string
  asChild?: boolean
}
