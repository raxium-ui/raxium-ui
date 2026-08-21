import { useState } from 'react'
import { Button } from '../../button'
import { HoverCard, useHoverCardContext } from '../index'

function HoverCardStatus() {
  const { open } = useHoverCardContext()
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm">
        open:
        {' '}
        {String(open)}
      </div>
      <div className="text-xs opacity-75">Use useHoverCardContext to access the API.</div>
    </div>
  )
}

export function HoverCardControlledAndContextExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full flex items-center gap-6">
      <Button onClick={() => setOpen(current => !current)}>
        Toggle open:
        {' '}
        {String(open)}
      </Button>
      <HoverCard
        open={open}
        positioning={{ placement: 'top' }}
        onOpenChange={details => setOpen(details.open)}
      >
        <HoverCard.Trigger asChild>
          <Button variant="outlined">Controlled hover-card</Button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <HoverCardStatus />
        </HoverCard.Content>
      </HoverCard>
    </div>
  )
}
