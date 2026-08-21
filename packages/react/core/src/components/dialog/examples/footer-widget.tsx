import { Button } from '../../button'
import { Dialog } from '../index'

export function DialogFooterWidgetExample() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outlined">Footer widget props</Button>
      </Dialog.Trigger>
      <Dialog.Content className="w-120">
        <Dialog.Header>Customize footer buttons</Dialog.Header>
        <Dialog.Body>Footer widget maps onto Button props plus text.</Dialog.Body>
        <Dialog.Footer
          widget={{
            cancel: { text: 'No', variant: 'text' },
            ok: { text: 'Yes', variant: 'solid' },
          }}
          ui={{
            cancel: 'text-gray-ff',
            ok: 'bg-rz-green text-black',
          }}
        />
      </Dialog.Content>
    </Dialog>
  )
}
