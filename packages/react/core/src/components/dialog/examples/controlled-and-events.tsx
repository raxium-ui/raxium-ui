import { useState } from 'react'
import { Button } from '../../button'
import { Dialog, TriggerFrom } from '../index'

export function DialogControlledAndEventsExample() {
  const [open, setOpen] = useState(false)
  const [lastFrom, setLastFrom] = useState<string | null | undefined>()

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button onClick={() => setOpen(true)}>Open (controlled)</Button>
        <span className="text-sm text-gray-ff">
          open:
          {String(open)}
        </span>
        <span className="text-xs opacity-75">
          lastFrom:
          {lastFrom}
        </span>
      </div>

      <Dialog
        open={open}
        lazyMount
        unmountOnExit
        onOpenChange={(details) => {
          setOpen(details.open)
          setLastFrom(details.from)
        }}
        onEscapeKeyDown={() => setLastFrom(TriggerFrom.ESCAPE)}
        onInteractOutside={() => setLastFrom(TriggerFrom.OUTSIDE)}
      >
        <Dialog.Trigger asChild>
          <Button variant="outlined">Open via Trigger</Button>
        </Dialog.Trigger>
        <Dialog.Content className="w-120">
          <Dialog.Header>Controlled Dialog</Dialog.Header>
          <Dialog.Body>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-cc">
                通过
                {' '}
                <code className="text-gray-ff">onOpenChange.details.from</code>
                {' '}
                追踪关闭来源。
              </div>
              <div className="flex items-center gap-3">
                <Dialog.CloseTrigger asChild from={TriggerFrom.CLOSE_TRIGGER}>
                  <Button variant="text">Close (close trigger)</Button>
                </Dialog.CloseTrigger>
                <Dialog.CloseTrigger asChild from="custom_from">
                  <Button variant="text">Close (custom from)</Button>
                </Dialog.CloseTrigger>
              </div>
            </div>
          </Dialog.Body>
          <Dialog.Footer
            onOk={() => setLastFrom(TriggerFrom.OK_BUTTON)}
            onCancel={() => setLastFrom(TriggerFrom.CANCEL_BUTTON)}
          />
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
