import { Collapsible } from '../index'

const content = 'Size sample copy for the React Collapsible.'

const sizes = [
  { size: 'xs', label: 'XS' },
  { size: 'sm', label: 'Small' },
  { size: 'base', label: 'Base' },
  { size: 'lg', label: 'Large' },
] as const

export function CollapsibleSizesExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      {sizes.map(({ size, label }) => (
        <Collapsible
          key={size}
          id={`collapsible-sizes-${size}`}
          className="w-full"
          theme={{ size }}
        >
          <Collapsible.Trigger>
            <div className="text-gray-ff">{label}</div>
          </Collapsible.Trigger>
          <Collapsible.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Collapsible.Content>
        </Collapsible>
      ))}
    </div>
  )
}
