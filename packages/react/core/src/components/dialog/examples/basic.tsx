import { Button } from '../../button'
import { Dialog } from '../index'

export function DialogBasicExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Dialog>
        <Dialog.Trigger asChild>
          <Button className="w-fit">Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content className="w-120">
          <Dialog.Header>Dialog Title</Dialog.Header>
          <Dialog.Body>Dialog Body</Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog>

      <Dialog>
        <Dialog.Trigger asChild>
          <Button className="w-fit">Open Razer Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content className="w-120" theme={{ surface: 'razer' }}>
          <Dialog.Header>Dialog Title</Dialog.Header>
          <Dialog.Body>Dialog Body</Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog>

      <Dialog lazyMount={false} unmountOnExit={false}>
        <Dialog.Trigger asChild>
          <Button className="w-fit">Open input dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content className="w-120">
          <Dialog.Header>Dialog Title</Dialog.Header>
          <Dialog.Body>
            <input type="text" className="w-full" />
          </Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
