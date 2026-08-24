import { useState } from 'react'
import { RadioGroup } from '../index'

const items = [
  { text: 'Alpha', value: 'alpha' },
  { text: 'Bravo', value: 'bravo' },
  { text: 'Charlie', value: 'charlie' },
]

export function RadioGroupBasicExample() {
  const [value, setValue] = useState<string | null>(items[1]?.value ?? null)

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-ff">
        value:
        {' '}
        {String(value)}
      </div>

      <RadioGroup value={value} onValueChange={details => setValue(details.value)}>
        <RadioGroup.Layout layout="inline">
          {items.map(item => (
            <RadioGroup.Item key={item.value} text={item.text} value={item.value} />
          ))}
        </RadioGroup.Layout>
      </RadioGroup>

      <RadioGroup
        value={value}
        onValueChange={details => setValue(details.value)}
        label="Basic"
      >
        <RadioGroup.Layout layout="stack">
          {items.map(item => (
            <RadioGroup.Item key={item.value} text={item.text} value={item.value} />
          ))}
        </RadioGroup.Layout>
      </RadioGroup>
    </div>
  )
}
