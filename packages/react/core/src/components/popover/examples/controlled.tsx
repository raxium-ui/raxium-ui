import { useState } from 'react'
import { Button } from '../../button'
import { Popover } from '../index'

export function PopoverControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full flex items-center gap-4">
      <Button onClick={() => setOpen(!open)}>
        Toggle open:
        {' '}
        {String(open)}
      </Button>

      <Popover
        open={open}
        onOpenChange={details => setOpen(details.open)}
        positioning={{ placement: 'bottom-start' }}
      >
        <Popover.Trigger asChild>
          <Button variant="outlined">Controlled Popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Arrow />
          <div className="flex flex-col gap-2">
            <Popover.Close />
            <div className="text-sm text-gray-ff">Controlled via open + onOpenChange</div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  )
}
