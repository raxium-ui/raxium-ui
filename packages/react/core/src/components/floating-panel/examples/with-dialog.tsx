import { Button } from '../../button'
import { Dialog } from '../../dialog'
import { FloatingPanel } from '../index'

export function FloatingPanelWithDialogExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <FloatingPanel minSize={{ width: 360, height: 240 }}>
        <FloatingPanel.Trigger asChild>
          <Button className="w-fit">Open Floating Panel</Button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Content>
          <FloatingPanel.Header control={<FloatingPanel.CloseTrigger />}>
            Floating Panel
          </FloatingPanel.Header>
          <div className="flex flex-col gap-3 p-3">
            <p>Open a dialog from inside the panel.</p>
            <Dialog>
              <Dialog.Trigger asChild>
                <Button className="w-fit">Open Dialog (inside panel)</Button>
              </Dialog.Trigger>
              <Dialog.Content className="w-120">
                <Dialog.Header>Dialog Above Panel</Dialog.Header>
                <Dialog.Body>
                  This dialog is opened from within a floating panel and should sit on top.
                </Dialog.Body>
                <Dialog.Footer />
              </Dialog.Content>
            </Dialog>
          </div>
        </FloatingPanel.Content>
      </FloatingPanel>

      <Dialog>
        <Dialog.Trigger asChild>
          <Button className="w-fit">Open Dialog (outside panel)</Button>
        </Dialog.Trigger>
        <Dialog.Content className="w-120">
          <Dialog.Header>Standalone Dialog</Dialog.Header>
          <Dialog.Body>
            Try mixing this with the floating panel — dialogs stack above the most-recently focused panel.
          </Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
