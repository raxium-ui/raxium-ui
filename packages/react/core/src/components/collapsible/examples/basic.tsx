import { Collapsible } from '../index'

const content = 'Collapsible content for the React port. Toggle the trigger to show or hide this copy.'

export function CollapsibleBasicExample() {
  return (
    <Collapsible className="w-full">
      <Collapsible.Trigger>
        <div className="text-sm text-gray-ff">Trigger</div>
      </Collapsible.Trigger>
      <Collapsible.Content className="mt-2">
        <p className="text-sm text-gray-cc">{content}</p>
      </Collapsible.Content>
    </Collapsible>
  )
}
