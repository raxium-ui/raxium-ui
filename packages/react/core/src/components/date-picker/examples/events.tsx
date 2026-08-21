import type { DateValue } from '@ark-ui/react/date-picker'
import { useState } from 'react'
import { DatePicker } from '../index'

export function DatePickerEventsExample() {
  const [value, setValue] = useState<DateValue[]>([])
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<string[]>([])

  function push(line: string) {
    setLines(prev => [line, ...prev].slice(0, 8))
  }

  const joined = lines.length ? lines.join('\n') : '（暂无事件）'

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-cc">
        监听：onOpenChange / onViewChange / onValueChange
      </div>
      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <DatePicker
          value={value}
          open={open}
          onValueChange={(details) => {
            setValue(details.value)
            push(`onValueChange: ${details.value.map(v => String(v)).join(', ')}`)
          }}
          onOpenChange={(details) => {
            setOpen(details.open)
            push(`onOpenChange: open=${details.open}`)
          }}
          onViewChange={details => push(`onViewChange: view=${details.view}`)}
        >
          <DatePicker.Control>
            <DatePicker.Trigger className="rounded-md border border-gray-33 px-3 py-2 text-sm text-gray-ff">
              <DatePicker.ValueText placeholder="选择日期" />
            </DatePicker.Trigger>
          </DatePicker.Control>
          <DatePicker.Content>
            <DatePicker.DayView />
          </DatePicker.Content>
        </DatePicker>
      </div>
      <pre className="w-full max-w-[520px] whitespace-pre-wrap rounded-md bg-gray-0c p-3 text-xs text-gray-cc">
        {joined}
      </pre>
    </div>
  )
}
