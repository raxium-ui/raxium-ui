import { Button } from '../../button'
import { FloatingPanel } from '../index'

export function FloatingPanelInitialStateExample() {
  return (
    <FloatingPanel minSize={{ width: 360, height: 240 }} opacity={60} pinned>
      <FloatingPanel.Trigger asChild>
        <Button className="w-fit">Open FloatingPanel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content>
        <FloatingPanel.Header
          control={(
            <>
              <FloatingPanel.PinTrigger />
              <FloatingPanel.CloseTrigger />
            </>
          )}
        >
          Initial state
        </FloatingPanel.Header>
        <div className="p-3 space-y-2">
          <div>Start with pinned = true, opacity = 60.</div>
          <div className="text-sm opacity-70">When pinned, dragging is disabled.</div>
        </div>
      </FloatingPanel.Content>
    </FloatingPanel>
  )
}
