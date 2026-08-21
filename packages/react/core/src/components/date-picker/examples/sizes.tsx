import type { DateValue } from '@ark-ui/react/date-picker'
import { useState } from 'react'
import { Button } from '../../button'
import { DatePicker } from '../index'

const sizes = ['xs', 'sm', 'base', 'lg'] as const

export function DatePickerSizesExample() {
  const [value, setValue] = useState<DateValue[]>([])

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        value:
        {' '}
        <span className="text-gray-ff">{value.length ? String(value[0]) : '(empty)'}</span>
      </div>
      <div className="w-full flex items-center gap-4 max-w-[520px] rounded-md border border-gray-33 p-3">
        {sizes.map(size => (
          <DatePicker
            key={size}
            value={value}
            theme={{ size }}
            onValueChange={details => setValue(details.value)}
          >
            <DatePicker.Control className="w-fit">
              <DatePicker.Trigger>
                <Button theme={{ size }}>{size}</Button>
              </DatePicker.Trigger>
            </DatePicker.Control>
            <DatePicker.Content>
              <DatePicker.DayView weekDayType="short" />
              <DatePicker.MonthView />
              <DatePicker.YearView />
            </DatePicker.Content>
          </DatePicker>
        ))}
      </div>
    </div>
  )
}
