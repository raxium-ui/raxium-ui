import { Button } from '../../button'
import { dialog, TriggerFrom, useDialog } from '../index'

export function DialogFunctionalExample() {
  const { dialog: dialogFn } = useDialog()

  function openWithContext() {
    dialogFn.open({
      title: 'useDialog()（继承 RUIConfig 上下文）',
      content:
        '此弹窗通过 useDialog() 唤起，会挂到 RUIConfig 内的 DialogRuntime，从而继承 theme / depth。',
      onOk: () => {
        console.log('useDialog ok')
      },
    })
  }

  function openBasic() {
    dialog({
      title: 'Functional Dialog',
      content: 'This dialog is opened via the dialog() API.',
      onOk: () => console.log('functional ok'),
      onCancel: () => console.log('functional cancel'),
      onOpenChange: details => console.log('functional openChange', details),
    })
  }

  function openCustomRender() {
    dialog({
      render: () => (
        <div className="flex flex-col gap-3">
          <div className="text-sm text-gray-ff">Custom render</div>
          <div className="text-sm text-gray-cc">You can fully control the content using a render function.</div>
        </div>
      ),
      footer: false,
      widget: {
        content: { className: 'w-120' },
      },
    })
  }

  function openWithBeforeClose() {
    dialog({
      title: 'beforeClose（函数式）',
      content: '在 beforeClose 内约 2000ms 后调用 done()；此前弹窗会保持打开。',
      beforeClose: ({ from, done }) => {
        if (from === TriggerFrom.OK_BUTTON)
          window.setTimeout(done, 2000)
        else
          done()
      },
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button onClick={openBasic}>Open Functional Dialog</Button>
      <Button variant="outlined" onClick={openCustomRender}>Open Custom Render</Button>
      <Button variant="outlined" onClick={openWithBeforeClose}>Open with beforeClose</Button>
      <Button variant="outlined" onClick={openWithContext}>Open with useDialog()</Button>
    </div>
  )
}
