import { Accordion } from '../index'

const content = 'Size sample copy for the React Accordion.'

const sizes = [
  { size: 'xs', label: 'XS' },
  { size: 'sm', label: 'Small' },
  { size: 'base', label: 'Base' },
  { size: 'lg', label: 'Large' },
] as const

export function AccordionSizesExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      {sizes.map(({ size, label }) => (
        <Accordion
          key={size}
          id={`accordion-sizes-${size}`}
          className="w-full flex flex-col gap-2"
          collapsible
          theme={{ size }}
        >
          <Accordion.Item value={size}>
            <Accordion.Trigger>
              <div className="text-gray-ff">{label}</div>
            </Accordion.Trigger>
            <Accordion.Content className="mt-2">
              <p className="text-sm text-gray-cc">{content}</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  )
}
