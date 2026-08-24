import { ScrollArea } from '../index'

export function ScrollAreaBothAxesExample() {
  return (
    <ScrollArea className="w-100 h-50 border border-gray-55 rounded">
      <ScrollArea.Viewport>
        <div className="h-200 w-200 bg-gray-22 p-3 text-sm text-gray-ff">
          Both scrollbars + corner
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
      <ScrollArea.Scrollbar orientation="horizontal" />
      <ScrollArea.Corner />
    </ScrollArea>
  )
}
