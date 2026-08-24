import { Tabs } from '../index'

const items = [
  { value: 'tab-1', label: 'Tab 1', content: 'Content 1' },
  { value: 'tab-2', label: 'Tab 2', content: 'Content 2' },
  { value: 'tab-3', label: 'Tab 3', content: 'Content 3' },
]

export function TabsBasicExample() {
  return (
    <Tabs defaultValue="tab-1">
      <Tabs.List className="w-80">
        {items.map(item => (
          <Tabs.Trigger key={item.value} value={item.value}>
            {item.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {items.map(item => (
        <Tabs.Content key={item.value} value={item.value}>
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs>
  )
}
