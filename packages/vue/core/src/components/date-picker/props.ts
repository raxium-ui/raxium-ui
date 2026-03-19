import type { DatePickerContentBaseProps, DatePickerControlBaseProps, DatePickerRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type * as ZagDatePicker from '@zag-js/date-picker'
import type { ComputedRef, HTMLAttributes } from 'vue'

// types
export type DatePickerContentProvide = {
  viewsState: ComputedRef<{
    count: number
    hasDayView: boolean
    hasMonthView: boolean
    hasYearView: boolean
  }>
}
export const DATE_PICKER_CONTENT_PROVIDE_KEY = Symbol('DATE_PICKER_CONTENT_PROVIDE_KEY')
export interface DatePickerProps extends DatePickerRootBaseProps, ThemeCrafts<'tvDatePicker'> {}
export type DatePickerRootEmits = {
  'focusChange': [details: ZagDatePicker.FocusChangeDetails]
  'openChange': [details: ZagDatePicker.OpenChangeDetails]
  'valueChange': [details: ZagDatePicker.ValueChangeDetails]
  'viewChange': [details: ZagDatePicker.ViewChangeDetails]
  'update:modelValue': [value: ZagDatePicker.DateValue[]]
  'update:open': [open: boolean]
  'update:view': [view: ZagDatePicker.DateView]
  'update:focusedValue': [focusedValue: ZagDatePicker.DateValue]
}
export interface DatePickerContentProps extends DatePickerContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface DatePickerControlProps extends DatePickerControlBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface DatePickerDayViewProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  weekDayType?: 'short' | 'long' | 'narrow'
}
export interface DatePickerMonthViewProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  monthType?: 'short' | 'long'
}
export interface DatePickerYearViewProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
