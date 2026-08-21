import type { FloatingPanelResizeAxis } from '../props'
import { useState } from 'react'
import { Button } from '../../button'
import { FloatingPanel } from '../index'

const axes: FloatingPanelResizeAxis[] = ['x', 'y', 'xy', 'xyc', 'custom']

export function FloatingPanelResizeAxisExample() {
  const [axis, setAxis] = useState<FloatingPanelResizeAxis>('xyc')

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm opacity-70">resize-axis:</span>
        {axes.map(item => (
          <Button key={item} type="button" theme={{ size: 'sm' }} onClick={() => setAxis(item)}>
            {item}
          </Button>
        ))}
      </div>
      <FloatingPanel resizeAxis={axis} minSize={{ width: 360, height: 240 }}>
        <FloatingPanel.Trigger asChild>
          <Button className="w-fit">Open FloatingPanel</Button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Content>
          <FloatingPanel.Header control={<FloatingPanel.CloseTrigger />}>
            Resize axis:
            {' '}
            {axis}
          </FloatingPanel.Header>
          <div className="p-3 space-y-2">
            <div>Try resizing the panel.</div>
            <div className="text-sm opacity-70">
              When axis = &quot;custom&quot;, no resize triggers are rendered by default.
            </div>
          </div>
        </FloatingPanel.Content>
      </FloatingPanel>
    </div>
  )
}
