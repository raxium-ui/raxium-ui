import {
  DatePickerTrigger,
  DatePickerValueText,
  useDatePickerContext,
} from '@ark-ui/react/date-picker'
import { DatePickerRoot } from './DatePicker'
import { DatePickerContent } from './DatePickerContent'
import { DatePickerControl } from './DatePickerControl'
import { DatePickerDayView } from './DatePickerDayView'
import { DatePickerMonthView } from './DatePickerMonthView'
import { DatePickerYearView } from './DatePickerYearView'

export const DatePicker = Object.assign(DatePickerRoot, {
  Control: DatePickerControl,
  Content: DatePickerContent,
  DayView: DatePickerDayView,
  MonthView: DatePickerMonthView,
  YearView: DatePickerYearView,
  Trigger: DatePickerTrigger,
  ValueText: DatePickerValueText,
})

export {
  DatePickerContent,
  DatePickerControl,
  DatePickerDayView,
  DatePickerMonthView,
  DatePickerTrigger,
  DatePickerValueText,
  DatePickerYearView,
  useDatePickerContext,
}

export type {
  DatePickerContentProps,
  DatePickerControlProps,
  DatePickerDayViewProps,
  DatePickerMonthViewProps,
  DatePickerProps,
  DatePickerViewsState,
  DatePickerYearViewProps,
} from './props'
