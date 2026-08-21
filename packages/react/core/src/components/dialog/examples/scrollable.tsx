import { Button } from '../../button'
import { Dialog } from '../index'

const content = Array.from({ length: 8 }, (_, i) => `Paragraph ${i + 1}. Long body text for scrollable dialog content.`).join('\n\n')

export function DialogScrollableExample() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button className="w-fit" variant="outlined">Scrollable body</Button>
      </Dialog.Trigger>
      <Dialog.Content className="w-140">
        <Dialog.Header>Scrollable Dialog</Dialog.Header>
        <Dialog.Body className="h-50">
          <p className="whitespace-pre-wrap text-sm text-gray-cc">{content}</p>
        </Dialog.Body>
        <Dialog.Footer />
      </Dialog.Content>
    </Dialog>
  )
}
