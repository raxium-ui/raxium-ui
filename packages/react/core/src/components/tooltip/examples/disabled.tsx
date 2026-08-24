import { Button } from '../../button'
import { Tooltip } from '../index'

export function TooltipDisabledExample() {
  return (
    <div className="w-full flex flex-wrap items-center gap-4">
      <Tooltip disabled>
        <Tooltip.Trigger asChild>
          <Button variant="outlined">Disabled tooltip</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          This text should not be shown.
        </Tooltip.Content>
      </Tooltip>

      <Tooltip positioning={{ placement: 'top' }}>
        <Tooltip.Trigger asChild>
          <Button>Enabled tooltip</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          Tooltip works normally.
        </Tooltip.Content>
      </Tooltip>
    </div>
  )
}
