import { Collapsible, useCollapsibleContext } from '../index'

const content = 'Short collapsible sample for trigger and indicator demos.'

function OpenLabel() {
  const { open } = useCollapsibleContext()
  return (
    <div className="text-sm text-gray-ff">
      {`Indicator disabled (open: ${open})`}
    </div>
  )
}

function TriangleIndicator() {
  const { open } = useCollapsibleContext()
  return <span className="text-xs text-gray-ff">{open ? '▲' : '▼'}</span>
}

function CustomLabel() {
  const { open } = useCollapsibleContext()
  return (
    <div className="text-sm text-gray-ff">
      {`Custom indicator (open: ${open})`}
    </div>
  )
}

export function CollapsibleIndicatorExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Collapsible className="w-full">
        <Collapsible.Trigger indicator={false}>
          <OpenLabel />
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-2">
          <p className="text-sm text-gray-cc">{content}</p>
        </Collapsible.Content>
      </Collapsible>

      <Collapsible className="w-full">
        <Collapsible.Trigger indicator={<TriangleIndicator />}>
          <CustomLabel />
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-2">
          <p className="text-sm text-gray-cc">{content}</p>
        </Collapsible.Content>
      </Collapsible>
    </div>
  )
}
