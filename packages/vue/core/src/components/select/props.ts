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
export interface SelectProps<T extends CollectionItem>
  extends Omit<SelectRootBaseProps<T>, 'modelValue' | 'defaultValue'>,
  ThemeCrafts<'tvSelect'> {
  class?: HTMLAttributes['class']
  modelValue?: SelectValueType[]
  defaultValue?: SelectValueType[]
}

// ts-plugin(2742)
export interface SelectEmits<T extends CollectionItem> {
  'focusOutside': [event: ZagSelect.FocusOutsideEvent]
  'highlightChange': [details: ZagSelect.HighlightChangeDetails<T>]
  'interactOutside': [event: ZagSelect.InteractOutsideEvent]
  'openChange': [details: ZagSelect.OpenChangeDetails]
  'pointerDownOutside': [event: ZagSelect.PointerDownOutsideEvent]
  'select': [details: ZagSelect.SelectionDetails]
  'valueChange': [details: ZagSelect.ValueChangeDetails<T>]
  'update:modelValue': [value: SelectValueType[]]
  'update:open': [open: boolean]
  'update:highlightedValue': [value: SelectValueType]
}

export interface SelectContentProps extends SelectContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
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
