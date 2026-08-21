import { Badge } from '../index'

const sizes = [
  { size: 'xs', label: 'xs' },
  { size: 'sm', label: 'sm' },
  { size: 'base', label: 'base' },
  { size: 'lg', label: 'Large' },
] as const

export function BadgeBasicExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map(({ size, label }) => (
        <Badge key={size} variant="default" theme={{ size }}>
          {label}
        </Badge>
      ))}
    </div>
  )
}
