import { Button } from '../../button'
import { Tooltip } from '../index'

export function TooltipBasicExample() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button>Hover tooltip</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        Basic tooltip content
      </Tooltip.Content>
    </Tooltip>
  )
}
