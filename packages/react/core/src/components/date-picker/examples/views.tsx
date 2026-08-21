import type { DateValue } from '@ark-ui/react/date-picker'
import { useState } from 'react'
import { DatePicker } from '../index'

export function DatePickerViewsExample() {
  const [value, setValue] = useState<DateValue[]>([])

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        views: day / month / year（点击 RangeText 切换）
      </div>
      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <DatePicker
          value={value}
          numOfMonths={1}
          onValueChange={details => setValue(details.value)}
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
    </div>
  )
}
