import { Button } from '../../button'
import { Dialog, TriggerFrom } from '../index'

const content = 'No header: Content shows the default close control. Custom close replaces it via the close prop.'

export function DialogContentCloseExample() {
  return (
    <div className="w-full flex flex-wrap items-center gap-4">
      <Dialog>
        <Dialog.Trigger asChild>
          <Button variant="outlined">No header (auto close in content)</Button>
        </Dialog.Trigger>
        <Dialog.Content className="w-120">
          <Dialog.Body>{content}</Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog>

      <Dialog>
        <Dialog.Trigger asChild>
          <Button variant="outlined">Custom close</Button>
        </Dialog.Trigger>
        <Dialog.Content
          className="w-120"
          showClose={false}
          close={(
            <Dialog.CloseTrigger asChild from={TriggerFrom.CLOSE_TRIGGER}>
              <Button className="absolute top-2 right-2" variant="text">Close</Button>
            </Dialog.CloseTrigger>
          )}
        >
          <Dialog.Body>{content}</Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
