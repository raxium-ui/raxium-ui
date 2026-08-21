import { useState } from 'react'
import { Button } from '../../button'
import { FloatingPanel } from '../index'

export function FloatingPanelMinSizeExample() {
  const [minSize, setMinSize] = useState({ width: 360, height: 240 })

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm opacity-70">min-size:</span>
        <Button type="button" theme={{ size: 'sm' }} onClick={() => setMinSize({ width: 300, height: 200 })}>
          300×200
        </Button>
        <Button type="button" theme={{ size: 'sm' }} onClick={() => setMinSize({ width: 480, height: 320 })}>
          480×320
        </Button>
        <Button type="button" theme={{ size: 'sm' }} onClick={() => setMinSize({ width: 640, height: 420 })}>
          640×420
        </Button>
      </div>
      <FloatingPanel minSize={minSize}>
        <FloatingPanel.Trigger asChild>
          <Button className="w-fit">Open FloatingPanel</Button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Content>
          <FloatingPanel.Header control={<FloatingPanel.CloseTrigger />}>
            Min size:
            {' '}
            {minSize.width}
            ×
            {minSize.height}
          </FloatingPanel.Header>
          <div className="p-3">Try resizing below the current min size.</div>
        </FloatingPanel.Content>
      </FloatingPanel>
    </div>
  )
}
