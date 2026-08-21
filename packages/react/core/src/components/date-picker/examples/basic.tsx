import type { DateValue } from '@ark-ui/react/date-picker'
import { useState } from 'react'
import { Button } from '../../button'
import { DatePicker } from '../index'

export function DatePickerBasicExample() {
  const [value, setValue] = useState<DateValue[]>([])

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        value:
        {' '}
        <span className="text-gray-ff">{value.length ? String(value[0]) : '(empty)'}</span>
      </div>
      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <DatePicker
          value={value}
          lazyMount
          unmountOnExit
          onValueChange={details => setValue(details.value)}
          onViewChange={details => console.log('view change', details)}
        >
          <DatePicker.Control className="w-fit">
            <DatePicker.Trigger>
              <Button>Select Date</Button>
            </DatePicker.Trigger>
          </DatePicker.Control>
          <DatePicker.Content>
            <DatePicker.DayView weekDayType="short" />
            <DatePicker.MonthView />
            <DatePicker.YearView />
          </DatePicker.Content>
        </DatePicker>
      </div>
    </div>
  )
}
