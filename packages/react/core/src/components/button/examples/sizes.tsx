import { Button } from '../index'

const sizes = [
  { size: 'xs', label: 'xs' },
  { size: 'sm', label: 'Small' },
  { size: 'base', label: 'Base' },
  { size: 'lg', label: 'Large' },
] as const

export function ButtonSizesExample() {
  return (
    <div className="w-full flex items-center gap-4">
      {sizes.map(({ size, label }) => (
        <Button key={size} theme={{ size }}>
          {label}
        </Button>
      ))}
    </div>
  )
}
