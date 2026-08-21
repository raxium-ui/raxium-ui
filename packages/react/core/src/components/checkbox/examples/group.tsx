import { useState } from 'react'
import { Checkbox } from '../index'

const items = [
  { label: 'Blue jay', value: 'blue-jay' },
  { label: 'Cardinal', value: 'cardinal' },
  { label: 'Sparrow', value: 'sparrow' },
  { label: 'Robin', value: 'robin' },
  { label: 'Owl (disabled)', value: 'owl', disabled: true },
]

export function CheckboxGroupExample() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-sm text-gray-ff">
        selected:
        {` ${JSON.stringify(value)}`}
      </span>
      <Checkbox.Group value={value} onValueChange={setValue} name="birds" className="flex items-center gap-4">
        {items.map(item => (
          <Checkbox
            key={item.value}
            label={item.label}
            value={item.value}
            disabled={item.disabled}
          />
        ))}
      </Checkbox.Group>
    </div>
  )
}
