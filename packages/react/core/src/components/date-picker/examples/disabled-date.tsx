import { getLocalTimeZone } from '@internationalized/date'
import { DatePicker } from '../index'

export function DatePickerDisabledDateExample() {
  return (
    <div className="w-full flex flex-col gap-2">
      <DatePicker
        isDateUnavailable={date => date.toDate(getLocalTimeZone()) > new Date()}
      >
        <DatePicker.Control>
          <DatePicker.Trigger className="rounded-md border border-gray-33 px-3 py-2 text-sm text-gray-ff">
            <DatePicker.ValueText placeholder="选择日期" />
          </DatePicker.Trigger>
        </DatePicker.Control>
        <DatePicker.Content>
          <DatePicker.DayView />
          <DatePicker.MonthView />
          <DatePicker.YearView />
        </DatePicker.Content>
      </DatePicker>
    </div>
  )
}
