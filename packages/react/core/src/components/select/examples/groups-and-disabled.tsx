import { createListCollection, Select } from '../index'

const groups = [
  {
    type: 'cat',
    label: 'Cats',
    items: [
      { label: 'Bengal', value: 'cat-0', type: 'cat', disabled: true },
      { label: 'Calico', value: 'cat-1', type: 'cat', disabled: false },
      { label: 'Maine Coon', value: 'cat-2', type: 'cat', disabled: false },
      { label: 'Siamese', value: 'cat-3', type: 'cat', disabled: false },
      { label: 'Tabby', value: 'cat-4', type: 'cat', disabled: false },
    ],
  },
  {
    type: 'bird',
    label: 'Birds',
    items: [
      { label: 'Canary', value: 'bird-0', type: 'bird', disabled: true },
      { label: 'Finch', value: 'bird-1', type: 'bird', disabled: false },
      { label: 'Parrot', value: 'bird-2', type: 'bird', disabled: false },
      { label: 'Sparrow', value: 'bird-3', type: 'bird', disabled: false },
      { label: 'Wren', value: 'bird-4', type: 'bird', disabled: false },
    ],
  },
] as const

const collection = createListCollection({
  items: groups.flatMap(group => [...group.items]),
  groupBy: item => item.type,
})

export function SelectGroupsAndDisabledExample() {
  return (
    <Select collection={collection}>
      <Select.Trigger className="w-70">
        <Select.Value placeholder="Select an animal" />
      </Select.Trigger>
      <Select.Content>
        {groups.map(group => (
          <Select.ItemGroup key={group.type} label={group.label}>
            {group.items.map((item, index) => (
              <Select.Item key={item.value} item={item}>
                {item.label}
                {index === 0 ? <span className="opacity-60"> (disabled)</span> : null}
              </Select.Item>
            ))}
          </Select.ItemGroup>
        ))}
      </Select.Content>
    </Select>
  )
}
