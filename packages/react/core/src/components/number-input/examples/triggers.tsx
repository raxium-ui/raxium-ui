import { useState } from 'react'
import { NumberInput } from '../index'

export function NumberInputTriggersExample() {
  const [value, setValue] = useState('10')

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        showTrigger=true
      </div>

      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <NumberInput
          value={value}
          showTrigger
          min={0}
          max={100}
          step={1}
          onValueChange={details => setValue(details.value)}
        />
      </div>
    </div>
  )
}
