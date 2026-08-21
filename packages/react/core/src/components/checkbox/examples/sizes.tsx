import { Checkbox } from '../index'

const sizes = [
  { size: 'xs', label: 'XS' },
  { size: 'sm', label: 'Small' },
  { size: 'base', label: 'Base' },
  { size: 'lg', label: 'Large' },
] as const

export function CheckboxSizesExample() {
  return (
    <div className="w-full flex items-center gap-6">
      {sizes.map(({ size, label }) => (
        <Checkbox key={size} theme={{ size }} label={label} />
      ))}
      <Checkbox theme={{ size: 'lg' }} label="Large (disabled)" disabled />
    </div>
  )
}
