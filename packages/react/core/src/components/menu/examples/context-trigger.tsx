import { useState } from 'react'
import { Menu } from '../index'

const items = ['compile', 'refactor', 'deploy', 'debug', 'patch', 'ship']

export function MenuContextTriggerExample() {
  const [selected, setSelected] = useState<string | undefined>()

  return (
    <div className="w-full flex items-center gap-4">
      <span className="text-sm text-gray-ff">
        Selected:
        {' '}
        {selected}
      </span>

      <Menu onSelect={details => setSelected(details.value)}>
        <Menu.ContextTrigger asChild>
          <div className="w-80 h-24 border border-gray-55 rounded flex items-center justify-center text-sm text-gray-ff select-none">
            Right click here
          </div>
        </Menu.ContextTrigger>
        <Menu.Content>
          {items.map(value => (
            <Menu.Item key={value} value={value}>
              <Menu.ItemText>{value}</Menu.ItemText>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu>
    </div>
  )
}
