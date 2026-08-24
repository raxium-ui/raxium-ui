import { useState } from 'react'
import { Button } from '../../button'
import { Menu } from '../index'

const items = ['Carrot', 'Broccoli', 'Spinach', 'Kale', 'Celery', 'Onion']

export function MenuCheckboxExample() {
  const [checked, setChecked] = useState<string[]>([])
  const label = checked.length ? `(${checked.length}) selected` : 'none'

  function toggle(value: string, isChecked: boolean) {
    setChecked(current =>
      isChecked
        ? Array.from(new Set([...current, value]))
        : current.filter(item => item !== value),
    )
  }

  return (
    <div className="w-full flex items-center gap-4">
      <span className="text-sm text-gray-ff">
        Checked:
        {' '}
        {label}
      </span>

      <Menu>
        <Menu.Trigger asChild>
          <Button>Menu Checkbox</Button>
        </Menu.Trigger>
        <Menu.Content>
          {items.map(value => (
            <Menu.CheckboxItem
              key={value}
              value={value}
              closeOnSelect={false}
              checked={checked.includes(value)}
              onCheckedChange={next => toggle(value, next)}
            >
              <Menu.ItemText>{value}</Menu.ItemText>
            </Menu.CheckboxItem>
          ))}
        </Menu.Content>
      </Menu>
    </div>
  )
}
