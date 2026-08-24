import { useState } from 'react'
import { Button } from '../../button'
import { createListCollection, Select } from '../index'

const items = [
  { label: 'Robin', value: 'bird-0' },
  { label: 'Sparrow', value: 'bird-1' },
  { label: 'Finch', value: 'bird-2' },
  { label: 'Wren', value: 'bird-3' },
  { label: 'Jay', value: 'bird-4' },
  { label: 'Dove', value: 'bird-5' },
  { label: 'Owl', value: 'bird-6' },
  { label: 'Hawk', value: 'bird-7' },
]

const collection = createListCollection({ items })

export function SelectControlledOpenAndHighlightExample() {
  const [open, setOpen] = useState(false)
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null)
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Button variant="outlined" onClick={() => setOpen(current => !current)}>
          Toggle open:
          {' '}
          {String(open)}
        </Button>
        <span className="text-sm text-gray-ff">
          highlighted:
          {' '}
          {highlightedValue ?? 'null'}
        </span>
      </div>

      <Select
        collection={collection}
        value={value}
        open={open}
        highlightedValue={highlightedValue}
        onValueChange={details => setValue(details.value)}
        onOpenChange={details => setOpen(details.open)}
        onHighlightChange={details => setHighlightedValue(details.highlightedValue)}
      >
        <Select.Trigger className="w-70" clearable>
          <Select.Value placeholder="Controlled open + highlightedValue" />
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
