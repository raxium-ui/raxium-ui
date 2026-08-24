import { useState } from 'react'
import { Button } from '../../button'
import { Menu } from '../index'

export function MenuControlledOpenExample() {
  const [open, setOpen] = useState(false)
  const [highlightedValue, setHighlightedValue] = useState<string | undefined>()

  return (
    <div className="w-full flex items-center gap-4">
      <div className="flex items-center gap-3">
        <Button onClick={() => setOpen(current => !current)}>
          Toggle open:
          {' '}
          {String(open)}
        </Button>
        <span className="text-sm text-gray-ff">
          highlighted:
          {' '}
          {highlightedValue ?? 'null'}
        </span>
      </div>

      <Menu
        open={open}
        highlightedValue={highlightedValue}
        closeOnSelect={false}
        loopFocus
        typeahead
        onOpenChange={details => setOpen(details.open)}
        onHighlightChange={details => setHighlightedValue(details.highlightedValue ?? undefined)}
      >
        <Menu.Trigger asChild>
          <Button variant="outlined">
            Controlled Menu
          </Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item value="copy">
            <Menu.ItemText>Copy</Menu.ItemText>
          </Menu.Item>
          <Menu.Item value="paste">
            <Menu.ItemText>Paste</Menu.ItemText>
          </Menu.Item>
          <Menu.Item value="delete" disabled>
            <Menu.ItemText>Delete (disabled)</Menu.ItemText>
          </Menu.Item>
        </Menu.Content>
      </Menu>
    </div>
  )
}
