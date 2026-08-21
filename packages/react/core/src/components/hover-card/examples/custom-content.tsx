import { Button } from '../../button'
import { HoverCard } from '../index'

export function HoverCardCustomContentExample() {
  return (
    <HoverCard positioning={{ placement: 'bottom' }}>
      <HoverCard.Trigger asChild>
        <Button variant="outlined">Custom UI</Button>
      </HoverCard.Trigger>
      <HoverCard.Content
        ui={{
          content: 'border-rz-green',
          inner: 'bg-gray-00 text-gray-ff dark:bg-gray-00 dark:text-gray-ff',
        }}
      >
        <HoverCard.Arrow
          className="[--arrow-background:var(--color-rz-green)] [--arrow-border:var(--color-gray-03)]"
          theme={{ size: 'lg' }}
        />
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">Title</div>
          <div className="text-sm opacity-80">
            Short supporting copy for the hover card. Keep it brief.
          </div>
          <div className="flex items-center gap-2">
            <Button>Action</Button>
            <Button variant="text">Cancel</Button>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard>
  )
}
