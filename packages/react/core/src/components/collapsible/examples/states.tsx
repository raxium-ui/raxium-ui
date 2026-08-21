import { Collapsible } from '../index'

const content = 'Collapsible content for the React port. Toggle the trigger to show or hide this copy.'

export function CollapsibleStatesExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Collapsible className="w-full" defaultOpen>
        <Collapsible.Trigger>
          <div className="text-sm text-gray-ff">Default open</div>
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-2">
          <p className="text-sm text-gray-cc">{content}</p>
        </Collapsible.Content>
      </Collapsible>

      <Collapsible className="w-full" disabled>
        <Collapsible.Trigger>
          <div className="text-sm text-gray-ff">Disabled (cannot toggle)</div>
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-2">
          <p className="text-sm text-gray-cc">{content}</p>
        </Collapsible.Content>
      </Collapsible>
    </div>
  )
}
