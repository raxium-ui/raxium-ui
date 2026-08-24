import { useState } from 'react'
import { createListCollection, Select } from '../index'

const items = [
  { label: 'Apple', value: 'fruit-0' },
  { label: 'Banana', value: 'fruit-1' },
  { label: 'Cherry', value: 'fruit-2' },
  { label: 'Mango', value: 'fruit-3' },
  { label: 'Orange', value: 'fruit-4' },
  { label: 'Peach', value: 'fruit-5' },
  { label: 'Pear', value: 'fruit-6' },
  { label: 'Plum', value: 'fruit-7' },
]

const collection = createListCollection({ items })

export function SelectMultipleAndClearableExample() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-ff">
        value:
        {' '}
        {JSON.stringify(value)}
      </div>

      <Select
        collection={collection}
        multiple
        value={value}
        onValueChange={details => setValue(details.value)}
      >
        <Select.Trigger className="w-80" clearable>
          <Select.Value placeholder="Select fruits (multiple)" />
        </Select.Trigger>
        <Select.Content>
          {items.map(item => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}
