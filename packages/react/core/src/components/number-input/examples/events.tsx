import { useState } from 'react'
import { NumberInput } from '../index'

export function NumberInputEventsExample() {
  const [value, setValue] = useState('10')
  const [lines, setLines] = useState<string[]>([])

  function push(line: string) {
    setLines(prev => [line, ...prev].slice(0, 8))
  }

  const joined = lines.length ? lines.join('\n') : '（暂无事件）'

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-cc">
        监听：onFocus / onBlur / onFocusChange / onValueChange / onValueInvalid
      </div>

      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <NumberInput
          value={value}
          showTrigger
          min={0}
          max={20}
          step={5}
          onFocus={() => push('focus')}
          onBlur={() => push('blur')}
          onFocusChange={details => push(`focus-change: focused=${details.focused} value=${details.value}`)}
          onValueChange={(details) => {
            setValue(details.value)
            push(`value-change: value=${details.value} number=${details.valueAsNumber}`)
          }}
          onValueInvalid={details => push(`value-invalid: reason=${details.reason} value=${details.value}`)}
        />
      </div>

      <pre className="w-full max-w-[520px] whitespace-pre-wrap rounded-md bg-gray-0c p-3 text-xs text-gray-cc">
        {joined}
      </pre>
    </div>
  )
}
