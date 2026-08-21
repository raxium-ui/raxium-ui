import { Button } from '../../button'
import { TriggerFrom, useDialog } from '../index'

export function DialogStackedFunctionalExample() {
  const { dialog: dialogFn } = useDialog()

  function openDialog3() {
    dialogFn.open({
      title: 'Dialog 3',
      widget: { content: { className: 'w-80' } },
      content: () => (
        <p className="text-sm opacity-75">第三层函数式弹窗。</p>
      ),
      footer: false,
    })
  }

  function openDialog2() {
    dialogFn.open({
      title: 'Dialog 2',
      widget: { content: { className: 'w-96' } },
      content: () => (
        <div className="flex flex-col gap-4">
          <p className="text-sm opacity-75">第二层。点击按钮打开 Dialog 3。</p>
          <Button variant="text" theme={{ size: 'sm' }} onClick={openDialog3}>
            打开 Dialog 3
          </Button>
        </div>
      ),
      footer: false,
    })
  }

  function openDialog1() {
    dialogFn.open({
      title: 'Dialog 1',
      widget: { content: { className: 'w-110' } },
      content: () => (
        <div className="flex flex-col gap-4">
          <p className="text-sm opacity-75">第一层。点击按钮打开 Dialog 2。</p>
          <Button variant="outlined" onClick={openDialog2}>打开 Dialog 2</Button>
        </div>
      ),
      footer: false,
    })
  }

  function openDoubleConfirmDialog() {
    dialogFn.open({
      title: 'Double Confirm Dialog',
      content: () => <div>Do you want to delete ?</div>,
      widget: {
        footer: {
          widget: {
            ok: { text: 'Delete', variant: 'solid', color: 'danger' },
          },
        },
      },
      beforeClose: ({ from, done: fDone }) => {
        if (from === TriggerFrom.OK_BUTTON) {
          const { options: secOptions } = dialogFn.open({
            title: 'Double Confirm Dialog',
            widget: {
              footer: {
                widget: {
                  ok: { text: 'Sure', loading: false },
                  cancel: { className: '' },
                },
              },
            },
            content: () => <div>Are you sure?</div>,
            beforeClose: ({ from: innerFrom, done: sDone }) => {
              if (innerFrom === TriggerFrom.OK_BUTTON) {
                const okBtn = secOptions.widget!.footer!.widget!.ok!
                const cancelBtn = secOptions.widget!.footer!.widget!.cancel!
                okBtn.loading = true
                cancelBtn.className = 'hidden'
                setTimeout(() => {
                  okBtn.loading = false
                  cancelBtn.className = ''
                  sDone()
                  fDone()
                }, 2000)
              }
              else {
                sDone()
                fDone(false)
              }
            },
          })
        }
        else {
          fDone()
        }
      },
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button onClick={openDialog1}>打开 Dialog 1</Button>
      <Button onClick={openDoubleConfirmDialog}>打开 Double Confirm</Button>
    </div>
  )
}
