import { Button } from '../../button'
import { FloatingPanel } from '../index'

export function FloatingPanelMinimalExample() {
  return (
    <FloatingPanel minSize={{ width: 360, height: 240 }}>
      <FloatingPanel.Trigger asChild>
        <Button className="w-fit">Open FloatingPanel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content>
        <FloatingPanel.Header control={<FloatingPanel.CloseTrigger />}>
          FloatingPanel
        </FloatingPanel.Header>
        <div className="p-3">Minimal content.</div>
      </FloatingPanel.Content>
    </FloatingPanel>
  )
}
