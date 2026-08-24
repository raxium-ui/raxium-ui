import { Checkbox } from '../../checkbox'
import { ScrollArea } from '../index'

export function ScrollAreaCustomUiExample() {
  return (
    <ScrollArea
      className="w-100 h-50 rounded border border-gray-55"
      ui={{ root: 'bg-gray-22' }}
    >
      <ScrollArea.Viewport
        ui={{
          root: 'rounded',
          content: 'p-3',
        }}
      >
        <div className="h-160 w-160 text-sm text-gray-ff">
          Custom UI (root/viewport/content)
          <div className="h-120" />
          End
        </div>
        <Checkbox label="Checkbox" />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        ui={{ root: 'bg-gray-00/20', thumb: 'bg-rz-green/70 hover:bg-rz-green' }}
      />
      <ScrollArea.Scrollbar
        orientation="horizontal"
        ui={{ root: 'bg-gray-00/20', thumb: 'bg-rz-green/70 hover:bg-rz-green' }}
      />
      <ScrollArea.Corner className="bg-gray-00/20" />
    </ScrollArea>
  )
}
