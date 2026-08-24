import { useState } from 'react'
import { Button } from '../../button'
import { Tabs } from '../index'

const alwaysVisible = [
  { value: 'tab-1', label: 'Tab 1', content: 'Content 1 (always visible)' },
  { value: 'tab-4', label: 'Tab 4', content: 'Content 4 (always visible)' },
]

export function TabsDynamicTriggersExample() {
  const [value, setValue] = useState('tab-1')
  const [showTab2, setShowTab2] = useState(true)
  const [showTab3, setShowTab3] = useState(true)

  const items = [
    alwaysVisible[0],
    ...(showTab2 ? [{ value: 'tab-2', label: 'Tab 2', content: 'Content 2' }] : []),
    ...(showTab3 ? [{ value: 'tab-3', label: 'Tab 3', content: 'Content 3' }] : []),
    alwaysVisible[1],
  ]

  const nextValue = items.some(item => item?.value === value) ? value : 'tab-1'

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outlined" onClick={() => setShowTab2(show => !show)}>
          {showTab2 ? 'Hide' : 'Show'}
          {' '}
          Tab 2
        </Button>
        <Button variant="outlined" onClick={() => setShowTab3(show => !show)}>
          {showTab3 ? 'Hide' : 'Show'}
          {' '}
          Tab 3
        </Button>
        <span className="text-sm text-gray-ff">
          value:
          {' '}
          {nextValue}
        </span>
      </div>

      <Tabs value={nextValue} onValueChange={details => setValue(details.value)}>
        <Tabs.List className="w-80">
          {items.map(item => item && (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        {items.map(item => item && (
          <Tabs.Content key={item.value} value={item.value}>
            {item.content}
          </Tabs.Content>
        ))}
      </Tabs>
    </div>
  )
}
