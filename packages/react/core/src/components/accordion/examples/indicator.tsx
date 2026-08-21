import { Accordion, useAccordionItemContext } from '../index'

const content = 'Trigger sample copy.'

function ItemOpenLabel() {
  const { expanded } = useAccordionItemContext()
  return (
    <div className="text-sm text-gray-ff">
      {`No default chevron (open: ${expanded})`}
    </div>
  )
}

function TriangleIndicator() {
  const { expanded } = useAccordionItemContext()
  return <span className="text-xs text-gray-ff">{expanded ? '▲' : '▼'}</span>
}

export function AccordionIndicatorExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Accordion
        id="accordion-trigger-no-indicator"
        className="w-full flex flex-col gap-2"
        collapsible
      >
        <Accordion.Item value="no-ind">
          <Accordion.Trigger indicator={false}>
            <ItemOpenLabel />
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>

      <Accordion
        id="accordion-trigger-custom-indicator"
        className="w-full flex flex-col gap-2"
        collapsible
      >
        <Accordion.Item value="custom">
          <Accordion.Trigger indicator={<TriangleIndicator />}>
            Custom indicator
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">{content}</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
