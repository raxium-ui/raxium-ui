import { THEME_SIZE } from '@raxium/shared/constant'
import { Tabs } from '../index'

const items = [
  { value: 'tab-1', label: 'size' },
  { value: 'tab-2', label: 'Tab 2' },
  { value: 'tab-3', label: 'Tab 3' },
]

export function TabsSizesExample() {
  return (
    <div className="w-full flex flex-col gap-6">
      {THEME_SIZE.map(size => (
        <Tabs
          key={size}
          defaultValue="tab-1"
          theme={{ size }}
          className="w-100"
        >
          <Tabs.List>
            {items.map(item => (
              <Tabs.Trigger key={item.value} value={item.value}>
                {item.value === 'tab-1' ? size : item.label}
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="tab-1">
            {`size=${size}`}
          </Tabs.Content>
          <Tabs.Content value="tab-2">
            Content 2
          </Tabs.Content>
          <Tabs.Content value="tab-3">
            Content 3
          </Tabs.Content>
        </Tabs>
      ))}
    </div>
  )
}
