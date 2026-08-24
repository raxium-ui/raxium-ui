import { useState } from 'react'
import { NumberInput } from '../index'

export function NumberInputBasicExample() {
  const [value, setValue] = useState('10')

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        value:
        {' '}
        <span className="text-gray-ff">{value}</span>
      </div>

      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <NumberInput
          value={value}
          min={0}
          max={100}
          step={5}
          onValueChange={details => setValue(details.value)}
        />
      </div>
    </div>
  )
}
