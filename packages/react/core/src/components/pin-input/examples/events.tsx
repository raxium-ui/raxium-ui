import type { PinInputValueChangeDetails } from '@ark-ui/react/pin-input'
import { useState } from 'react'
import { PinInput } from '../index'

export function PinInputEventsExample() {
  const [value, setValue] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  function onValueChange(details: PinInputValueChangeDetails) {
    setValue(details.value)
    setIsInvalid(false)
  }

  function onValueComplete(details: PinInputValueChangeDetails) {
    setIsComplete(true)
    console.log('Complete:', details.valueAsString)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm text-gray-cc flex flex-col gap-1">
        <div>
          value:
          {' '}
          <span className="text-gray-ff">{value.join('') || '(empty)'}</span>
        </div>
        <div>
          complete:
          {' '}
          <span className={isComplete ? 'text-green-44' : 'text-gray-55'}>{String(isComplete)}</span>
        </div>
        <div>
          invalid:
          {' '}
          <span className={isInvalid ? 'text-red-55' : 'text-gray-55'}>{String(isInvalid)}</span>
        </div>
      </div>

      <PinInput
        count={4}
        type="numeric"
        placeholder="○"
        invalid={isInvalid}
        onValueChange={onValueChange}
        onValueComplete={onValueComplete}
        onValueInvalid={() => setIsInvalid(true)}
      />
    </div>
  )
}
