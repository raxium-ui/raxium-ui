import { Button } from '../../button'
import { Dialog } from '../index'

export function DialogStackedExample() {
  return (
    <Dialog lazyMount unmountOnExit>
      <Dialog.Trigger asChild>
        <Button>打开 Dialog 1</Button>
      </Dialog.Trigger>
      <Dialog.Content className="w-110">
        <Dialog.Header>
          <span>Dialog 1</span>
        </Dialog.Header>
        <Dialog.Body className="flex flex-col gap-4">
          <p className="text-sm opacity-75">第一层弹窗。点击下方按钮叠加 Dialog 2。</p>
          <Dialog lazyMount unmountOnExit>
            <Dialog.Trigger asChild>
              <Button variant="outlined">打开 Dialog 2</Button>
            </Dialog.Trigger>
            <Dialog.Content className="w-96">
              <Dialog.Header>
                <span>Dialog 2</span>
              </Dialog.Header>
              <Dialog.Body className="flex flex-col gap-4">
                <p className="text-sm opacity-75">第二层弹窗。点击遮罩仅关闭 Dialog 2。</p>
                <Dialog lazyMount unmountOnExit>
                  <Dialog.Trigger asChild>
                    <Button variant="text">打开 Dialog 3</Button>
                  </Dialog.Trigger>
                  <Dialog.Content className="w-80">
                    <Dialog.Header>
                      <span>Dialog 3</span>
                    </Dialog.Header>
                    <Dialog.Body>
                      <p className="text-sm opacity-75">第三层弹窗，z-index 由 depth owner 叠加。</p>
                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  )
}
