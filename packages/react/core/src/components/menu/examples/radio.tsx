import { useState } from 'react'
import { Button } from '../../button'
import { Menu } from '../index'

const items = ['Carrot', 'Broccoli', 'Spinach', 'Kale', 'Celery', 'Onion']

export function MenuRadioExample() {
  const [selected, setSelected] = useState<string | undefined>(items[0])

  return (
    <div className="w-full flex items-center gap-4">
      <span className="text-sm text-gray-ff">
        Selected:
        {' '}
        {selected}
      </span>

      <Menu>
        <Menu.Trigger asChild>
          <Button>Menu Radio</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.RadioItemGroup
            value={selected}
            onValueChange={details => setSelected(details.value)}
          >
            {items.map((value, index) => (
              <Menu.RadioItem
                key={value}
                value={value}
                closeOnSelect={false}
                variant={index % 2 === 0 ? 'default' : 'checkbox'}
              >
                <Menu.ItemText>{value}</Menu.ItemText>
              </Menu.RadioItem>
            ))}
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu>
    </div>
  )
}
