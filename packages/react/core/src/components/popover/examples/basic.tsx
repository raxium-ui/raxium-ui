import { Button } from '../../button'
import { Popover } from '../index'

export function PopoverBasicExample() {
  return (
    <div className="w-full flex flex-wrap items-center gap-4">
      <Popover positioning={{ placement: 'bottom-start' }}>
        <Popover.Trigger asChild>
          <Button>
            Click Popover
            {' '}
            <Popover.Indicator />
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Arrow />
          <div className="flex flex-col gap-2">
            <Popover.Close />
            <div className="text-sm text-gray-ff">Popover content</div>
            <div className="text-sm text-gray-cc">This is a basic popover example.</div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  )
}
