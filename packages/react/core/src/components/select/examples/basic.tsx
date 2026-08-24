import { useState } from 'react'
import { createListCollection, Select } from '../index'

const items = [
  { label: 'Robin', value: '0' },
  { label: 'Sparrow', value: '1' },
  { label: 'Finch', value: '2' },
  { label: 'Wren', value: '3' },
  { label: 'Jay', value: '4' },
  { label: 'Dove', value: '5' },
]

const collection = createListCollection({ items })

export function SelectBasicExample() {
  const [value, setValue] = useState<string[]>(['2'])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-ff">
        value:
        {' '}
        {JSON.stringify(value)}
      </div>

      <Select
        collection={collection}
        value={value}
        onValueChange={details => setValue(details.value)}
      >
        <Select.Trigger className="w-60">
          <Select.Value placeholder="Select an animal" />
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
