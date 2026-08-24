import { useState } from 'react'
import { Button } from '../../button'
import { Menu } from '../index'

const vegetables = ['Carrot', 'Broccoli', 'Spinach', 'Kale', 'Celery']
const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Pear']

export function MenuSubmenuExample() {
  const [selected, setSelected] = useState<string | undefined>()

  return (
    <div className="w-full flex items-center gap-4">
      <span className="text-sm text-gray-ff">
        Selected:
        {' '}
        {selected}
      </span>

      <Menu theme={{ size: 'sm' }} onSelect={details => setSelected(details.value)}>
        <Menu.Trigger asChild>
          <Button>Submenu</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Arrow />
          <Menu positioning={{ placement: 'right', offset: { mainAxis: 10 } }}>
            <Menu.TriggerItem>
              Vegetables
            </Menu.TriggerItem>
            <Menu.Content>
              {vegetables.map(vegetable => (
                <Menu.Item key={vegetable} value={vegetable}>
                  <Menu.ItemText>{vegetable}</Menu.ItemText>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu>
          <Menu positioning={{ placement: 'right', offset: { mainAxis: 10 } }}>
            <Menu.TriggerItem>
              Fruits
            </Menu.TriggerItem>
            <Menu.Content>
              {fruits.map(fruit => (
                <Menu.Item key={fruit} value={fruit}>
                  <Menu.ItemText>{fruit}</Menu.ItemText>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu>
        </Menu.Content>
      </Menu>
    </div>
  )
}
