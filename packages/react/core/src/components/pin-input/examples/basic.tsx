import { useState } from 'react'
import { PinInput } from '../index'

export function PinInputBasicExample() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm text-gray-cc">
        value:
        {' '}
        <span className="text-gray-ff">{value.length ? value.join('') : '(empty)'}</span>
      </div>

      <PinInput
        value={value}
        count={4}
        label="Verification Code"
        onValueChange={details => setValue(details.value)}
      />

      <PinInput
        value={value}
        count={4}
        label="Verification Code"
        prefix={<span className="text-gray-cc">+86</span>}
        suffix={<span className="text-gray-cc">.com</span>}
        onValueChange={details => setValue(details.value)}
      />
    </div>
  )
}
