import { THEME_SIZE } from '@raxium/shared/constant'
import { createListCollection, Select } from '../index'

const items = [
  { label: 'Beagle', value: 'dog-0' },
  { label: 'Corgi', value: 'dog-1' },
  { label: 'Husky', value: 'dog-2' },
  { label: 'Poodle', value: 'dog-3' },
  { label: 'Terrier', value: 'dog-4' },
]

const collection = createListCollection({ items })

export function SelectSizesExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      {THEME_SIZE.map(size => (
        <Select key={size} collection={collection} theme={{ size }}>
          <Select.Trigger className="w-60">
            <Select.Value placeholder={`size=${size}`} />
          </Select.Trigger>
          <Select.Content>
            {items.map(item => (
              <Select.Item key={item.value} item={item}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      ))}
    </div>
  )
}
