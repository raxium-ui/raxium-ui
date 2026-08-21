import { Accordion } from '../index'

const content = 'Accordion content for browsing the React port. Expand a section to reveal this copy.'

export function AccordionStatesExample() {
  return (
    <div className="w-full flex flex-col gap-6">
      <Accordion
        id="accordion-states-default-open"
        className="w-full flex flex-col gap-2"
        collapsible
        defaultValue={['item-1']}
      >
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <div className="text-sm text-gray-ff">Default open (section 1)</div>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <div className="text-sm text-gray-ff">Section 2</div>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>

      <Accordion
        id="accordion-states-multiple"
        className="w-full flex flex-col gap-2"
        collapsible
        multiple
        defaultValue={['a', 'b']}
      >
        <Accordion.Item value="a">
          <Accordion.Trigger>
            <div className="text-sm text-gray-ff">Multiple: A (default open)</div>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>
            <div className="text-sm text-gray-ff">Multiple: B (default open)</div>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="c">
          <Accordion.Trigger>
            <div className="text-sm text-gray-ff">Multiple: C</div>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>

      <Accordion
        id="accordion-states-disabled"
        className="w-full flex flex-col gap-2"
        collapsible
      >
        <Accordion.Item value="open">
          <Accordion.Trigger>
            <div className="text-sm text-gray-ff">Expandable</div>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="locked" disabled>
          <Accordion.Trigger>
            <div className="text-sm text-gray-ff">Disabled (cannot toggle)</div>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>

      <Accordion
        id="accordion-states-collapsible"
        className="w-full flex flex-col gap-2"
        collapsible
        defaultValue={['only']}
      >
        <Accordion.Item value="only">
          <Accordion.Trigger>
            <div className="text-sm text-gray-ff">Collapsible: all panels can close</div>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
