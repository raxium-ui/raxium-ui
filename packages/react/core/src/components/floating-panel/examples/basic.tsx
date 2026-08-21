import { Blend } from 'lucide-react'
import { Button } from '../../button'
import { FloatingPanel, useFloatingPanelAppearance } from '../index'

function OpacityControl() {
  const { opacity, setOpacity } = useFloatingPanelAppearance()

  return (
    <span
      className="flex items-center gap-1"
      onPointerDown={event => event.stopPropagation()}
    >
      <Blend className="size-[1lh]" />
      <input
        type="range"
        min={30}
        max={100}
        step={1}
        value={opacity}
        className="w-16"
        onChange={event => setOpacity(Number(event.target.value))}
      />
    </span>
  )
}

export function FloatingPanelBasicExample() {
  return (
    <FloatingPanel minSize={{ width: 400, height: 400 }}>
      <FloatingPanel.Trigger asChild>
        <Button className="w-fit">Open FloatingPanel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content>
        <FloatingPanel.Header
          control={(
            <>
              <OpacityControl />
              <FloatingPanel.PinTrigger />
              <FloatingPanel.StageTrigger stage="minimized" />
              <FloatingPanel.StageTrigger stage="maximized" />
              <FloatingPanel.StageTrigger stage="default" />
              <FloatingPanel.CloseTrigger />
            </>
          )}
        >
          FloatingPanel Title
        </FloatingPanel.Header>
        <div>floating panel content</div>
      </FloatingPanel.Content>
    </FloatingPanel>
  )
}
