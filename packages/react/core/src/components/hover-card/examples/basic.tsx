import { Button } from '../../button'
import { HoverCard } from '../index'

export function HoverCardBasicExample() {
  return (
    <HoverCard positioning={{ placement: 'top' }}>
      <HoverCard.Trigger asChild>
        <Button>Hover Card</Button>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <HoverCard.Arrow />
        <div className="text-sm">content</div>
      </HoverCard.Content>
    </HoverCard>
  )
}
