import { Accordion } from '../index'

const content = 'Accordion content for browsing the React port. Expand a section to reveal this copy.'

const sections = [
  { value: 'item-1', title: 'Section 1' },
  { value: 'item-2', title: 'Section 2' },
  { value: 'item-3', title: 'Section 3' },
]

export function AccordionBasicExample() {
  return (
    <Accordion id="accordion-basic" className="w-full flex flex-col gap-2">
      {sections.map(section => (
        <Accordion.Item key={section.value} value={section.value}>
          <Accordion.Trigger>
            <div className="text-sm text-gray-ff">{section.title}</div>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
