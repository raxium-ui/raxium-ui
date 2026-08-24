import { THEME_SIZE } from '@raxium/shared/constant'
import { useState } from 'react'
import { NumberInput } from '../index'

export function NumberInputSizesExample() {
  const [value, setValue] = useState('10')

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-sm text-gray-cc">
        sm / base / lg（showTrigger=true）
      </div>

      <div className="w-full max-w-[520px] flex flex-col gap-3 rounded-md border border-gray-33 p-3">
        {THEME_SIZE.map(size => (
          <NumberInput
            key={size}
            value={value}
            theme={{ size }}
            showTrigger
            min={0}
            max={100}
            step={1}
            onValueChange={details => setValue(details.value)}
          />
        ))}
      </div>
    </div>
  )
}
