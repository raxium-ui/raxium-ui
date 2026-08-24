import type { OverlayHostProps } from '../../useOverlay'
import { Dialog } from '../../../dialog'

export interface OverlayBasicDialogProps extends OverlayHostProps {
  title: string
  content: string
}

export function OverlayBasicDialog({
  title,
  content,
  open,
  onOpenChange,
  onExitComplete,
}: OverlayBasicDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} onExitComplete={onExitComplete}>
      <Dialog.Content className="w-120">
        <Dialog.Header>{title}</Dialog.Header>
        <Dialog.Body>{content}</Dialog.Body>
      </Dialog.Content>
    </Dialog>
  )
}
