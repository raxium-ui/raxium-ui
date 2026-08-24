import { THEME_SIZE } from '@raxium/shared/constant'
import { useState } from 'react'
import { Button } from '../../button'
import { Menu } from '../index'

const vegetables = ['Carrot', 'Broccoli', 'Spinach', 'Kale', 'Celery']
const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Pear']

export function MenuSizesExample() {
  const [selected, setSelected] = useState<string | undefined>(vegetables[0])

  return (
    <div className="w-full flex items-center gap-4">
      <span className="text-sm text-gray-ff">
        Selected:
        {' '}
        {selected}
      </span>

      {THEME_SIZE.map(size => (
        <Menu key={size} theme={{ size }} onSelect={details => setSelected(details.value)}>
          <Menu.Trigger asChild>
            <Button className={size}>
              Menu
              {' '}
              {size}
            </Button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Arrow />
            <Menu.ItemGroup label="Vegetables">
              {vegetables.map(vegetable => (
                <Menu.Item key={vegetable} value={vegetable}>
                  <Menu.ItemText>{vegetable}</Menu.ItemText>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup label="Fruits">
              {fruits.map((fruit, index) => (
                <Menu.Item key={fruit} value={fruit} disabled={index % 2 === 0}>
                  <Menu.ItemText>{fruit}</Menu.ItemText>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu>
      ))}
    </div>
  )
}
