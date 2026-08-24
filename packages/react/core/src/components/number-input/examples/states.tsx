import { useState } from 'react'
import { NumberInput } from '../index'

export function NumberInputStatesExample() {
  const [normal, setNormal] = useState('10')

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full max-w-[520px] flex flex-col gap-3">
        <div className="text-sm text-gray-cc">
          Normal
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <NumberInput
            value={normal}
            showTrigger
            min={0}
            max={100}
            step={5}
            onValueChange={details => setNormal(details.value)}
          />
        </div>

        <div className="text-sm text-gray-cc">
          Disabled
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <NumberInput defaultValue="10" disabled showTrigger />
        </div>

        <div className="text-sm text-gray-cc">
          ReadOnly
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <NumberInput defaultValue="10" readOnly showTrigger />
        </div>

        <div className="text-sm text-gray-cc">
          Invalid（仅展示状态）
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <NumberInput defaultValue="10" invalid showTrigger />
        </div>
      </div>
    </div>
  )
}
