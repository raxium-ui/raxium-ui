import { Button } from '../../button'
import { HoverCard } from '../index'

export function HoverCardDelaysAndPositioningExample() {
  return (
    <div className="w-full flex flex-wrap items-center gap-6">
      <HoverCard openDelay={0} closeDelay={0} positioning={{ placement: 'top' }}>
        <HoverCard.Trigger asChild>
          <Button variant="outlined">No delay (top)</Button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <HoverCard.Arrow />
          openDelay=0 closeDelay=0
        </HoverCard.Content>
      </HoverCard>

      <HoverCard openDelay={800} closeDelay={300} positioning={{ placement: 'bottom-start' }}>
        <HoverCard.Trigger asChild>
          <Button variant="outlined">Delayed (bottom-start)</Button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <HoverCard.Arrow />
          openDelay=800 closeDelay=300
        </HoverCard.Content>
      </HoverCard>

      <HoverCard positioning={{ placement: 'right' }} unmountOnExit lazyMount>
        <HoverCard.Trigger asChild>
          <Button variant="outlined">Lazy mount + unmount</Button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <HoverCard.Arrow />
          mounted only when opened
        </HoverCard.Content>
      </HoverCard>
    </div>
  )
}
