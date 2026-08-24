import { ScrollArea } from '../index'

export function ScrollAreaBasicExample() {
  return (
    <ScrollArea className="w-100 h-50 bg-gray-22">
      <ScrollArea.Viewport>
        <div className="h-120 w-100 text-sm text-gray-ff overflow-hidden">
          <p>Scroll area (vertical)</p>
          <p className="text-gray-cc">
            Scroll down to see scrollbar behavior.
          </p>
          <div className="h-80" />
          <p>Bottom</p>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
    </ScrollArea>
  )
}
