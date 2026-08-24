import { useState } from 'react'
import { Button } from '../../button'
import { Tabs } from '../index'

const items = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1
  return { value: `tab-${n}`, label: `Tab ${n}`, content: `Content ${n}` }
})

export function TabsControlledExample() {
  const [value, setValue] = useState('tab-7')

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button variant="outlined" onClick={() => setValue('tab-1')}>
          Tab 1
        </Button>
        <Button variant="outlined" onClick={() => setValue('tab-7')}>
          Tab 7
        </Button>
        <Button variant="outlined" onClick={() => setValue('tab-10')}>
          Tab 10
        </Button>
        <span className="text-sm text-gray-ff">
          value:
          {' '}
          {value}
        </span>
      </div>

      <Tabs value={value} onValueChange={details => setValue(details.value)}>
        <Tabs.List className="w-90">
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
    </div>
  )
}
