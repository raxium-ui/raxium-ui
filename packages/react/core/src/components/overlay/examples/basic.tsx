import { useMemo } from 'react'
import { Button } from '../../button'
import { useOverlay } from '../index'
import { OverlayBasicDialog } from './components/BasicDialog'

export function OverlayBasicExample() {
  const overlay = useOverlay()
  const basicDialog = useMemo(() => overlay.create(OverlayBasicDialog), [overlay])

  function handleOpenDialog() {
    void basicDialog.open({
      title: 'Overlay Dialog',
      content: 'Overlay Dialog Content',
    })
  }

  function handleOpenDestroyOnCloseDialog() {
    const destroyOnCloseDialog = overlay.create(OverlayBasicDialog, {
      destroyOnClose: true,
    })
    void destroyOnCloseDialog.open({
      title: 'Overlay Dialog',
      content: 'Overlay Dialog Destroy On Close',
    })
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <Button className="w-fit" onClick={handleOpenDialog}>
        Open Dialog
      </Button>
      <Button className="w-fit" onClick={handleOpenDestroyOnCloseDialog}>
        Open Destroy On Close Dialog
      </Button>
    </div>
  )
}
