import { Tabs } from '../index'

const items = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1
  return { value: `tab-${n}`, label: `Tab ${n}`, content: `Content ${n}` }
})

export function TabsScrollableListExample() {
  return (
    <Tabs defaultValue="tab-7">
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
