import { useRef, useState } from 'react'
import { Button } from '../../button'
import { NumberInput } from '../index'

export function NumberInputProgrammaticExample() {
  const [value, setValue] = useState('10')
  const inputRef = useRef<HTMLInputElement>(null)
  const step = 5
  const min = 0
  const max = 20

  function toNumber(next: string) {
    const parsed = Number(next)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outlined" onClick={() => inputRef.current?.focus()}>
          Focus
        </Button>
        <Button variant="outlined" onClick={() => setValue(String(Math.max(min, toNumber(value) - step)))}>
          - step
        </Button>
        <Button variant="outlined" onClick={() => setValue(String(Math.min(max, toNumber(value) + step)))}>
          + step
        </Button>
        <Button variant="outlined" onClick={() => setValue(String(min))}>
          Set min
        </Button>
        <Button variant="outlined" onClick={() => setValue(String(max))}>
          Set max
        </Button>
        <Button variant="outlined" onClick={() => setValue('')}>
          Clear
        </Button>
        <div className="text-sm text-gray-cc">
          value:
          {' '}
          <span className="text-gray-ff">{value || '(empty)'}</span>
        </div>
      </div>

      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <NumberInput
          ref={inputRef}
          value={value}
          showTrigger
          min={min}
          max={max}
          step={step}
          onValueChange={details => setValue(details.value)}
        />
      </div>
    </div>
  )
}
