import { ScrollArea } from '../index'

const sizes = ['xs', 'sm', 'base', 'lg'] as const

export function ScrollAreaSizesExample() {
  return (
    <div className="w-full flex flex-wrap items-start gap-6">
      {sizes.map(size => (
        <ScrollArea
          key={size}
          className="w-70 h-40 border border-gray-55 rounded"
          theme={{ size }}
        >
          <ScrollArea.Viewport>
            <div className="h-120 w-120 bg-gray-22 p-2 text-xs text-gray-ff">
              {`size=${size}`}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar />
          <ScrollArea.Scrollbar orientation="horizontal" />
          <ScrollArea.Corner />
        </ScrollArea>
      ))}
    </div>
  )
}
