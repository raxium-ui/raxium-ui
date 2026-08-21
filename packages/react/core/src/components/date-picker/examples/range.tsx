import type { DateValue } from '@ark-ui/react/date-picker'
import { useState } from 'react'
import { DatePicker } from '../index'

export function DatePickerRangeExample() {
  const [value, setValue] = useState<DateValue[]>([])
  const text = value.length ? value.map(v => String(v)).join(' ~ ') : '(empty)'

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        range:
        {' '}
        <span className="text-gray-ff">{text}</span>
      </div>
      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <DatePicker
          value={value}
          selectionMode="range"
          onValueChange={details => setValue(details.value)}
        >
          <DatePicker.Control>
            <DatePicker.Trigger className="rounded-md border border-gray-33 px-3 py-2 text-sm text-gray-ff">
              <DatePicker.ValueText placeholder="选择日期范围" />
            </DatePicker.Trigger>
          </DatePicker.Control>
          <DatePicker.Content>
            <DatePicker.DayView />
            <DatePicker.MonthView />
          </DatePicker.Content>
        </DatePicker>
      </div>
    </div>
  )
}
