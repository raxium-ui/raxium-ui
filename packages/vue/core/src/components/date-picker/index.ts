import { DatePickerTrigger, DatePickerValueText } from '@ark-ui/vue/date-picker'
import { withCompoundParts } from '../../utils/withCompoundParts'
import DatePickerRoot from './DatePicker.vue'
import DatePickerContent from './DatePickerContent.vue'
import DatePickerControl from './DatePickerControl.vue'
import DatePickerDayView from './DatePickerDayView.vue'
import DatePickerMonthView from './DatePickerMonthView.vue'
import DatePickerYearView from './DatePickerYearView.vue'

export const DatePicker = withCompoundParts(DatePickerRoot, {
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
}
export * from './props'
