import { Button } from '../../button'
import { FloatingPanel } from '../index'

const panels = [
  { id: 'a', title: 'Panel A', body: 'Click any panel to bring it to the front.' },
  { id: 'b', title: 'Panel B', body: 'Focus this panel to promote its z-index.' },
  { id: 'c', title: 'Panel C', body: 'Last focused panel wins.' },
] as const

export function FloatingPanelMultipleExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {panels.map(panel => (
        <FloatingPanel key={panel.id} minSize={{ width: 320, height: 220 }}>
          <FloatingPanel.Trigger asChild>
            <Button className="w-fit">
              Open
              {' '}
              {panel.title}
            </Button>
          </FloatingPanel.Trigger>
          <FloatingPanel.Content>
            <FloatingPanel.Header control={<FloatingPanel.CloseTrigger />}>
              {panel.title}
            </FloatingPanel.Header>
            <div className="p-3">{panel.body}</div>
          </FloatingPanel.Content>
        </FloatingPanel>
      ))}
    </div>
  )
}
