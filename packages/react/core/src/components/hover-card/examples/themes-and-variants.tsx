import { THEME_SIZE } from '@raxium/shared/constant'
import { Button } from '../../button'
import { HoverCard } from '../index'

export function HoverCardThemesAndVariantsExample() {
  return (
    <div className="w-full flex flex-wrap items-center gap-6">
      {THEME_SIZE.map(size => (
        <HoverCard key={size} theme={{ size }} positioning={{ placement: 'top' }}>
          <HoverCard.Trigger asChild>
            <Button variant="outlined">{size}</Button>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <HoverCard.Arrow />
            {size}
            {' '}
            content
          </HoverCard.Content>
        </HoverCard>
      ))}

      <HoverCard theme={{ bordered: false }} positioning={{ placement: 'top' }}>
        <HoverCard.Trigger asChild>
          <Button variant="outlined">no border</Button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <HoverCard.Arrow />
          bordered=false
        </HoverCard.Content>
      </HoverCard>

      <HoverCard theme={{ surface: 'dark' }} positioning={{ placement: 'top' }}>
        <HoverCard.Trigger asChild>
          <Button variant="outlined">dark skin</Button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <HoverCard.Arrow />
          surface=dark
        </HoverCard.Content>
      </HoverCard>
    </div>
  )
}
