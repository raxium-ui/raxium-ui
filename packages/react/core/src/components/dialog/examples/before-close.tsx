import type { DialogTriggerFrom } from '../dialog-intercept-context'
import { useState } from 'react'
import { Button } from '../../button'
import { Dialog, TriggerFrom } from '../index'

export function DialogBeforeCloseExample() {
  const [openSync, setOpenSync] = useState(false)
  const [openAsync, setOpenAsync] = useState(false)
  const [openResume, setOpenResume] = useState(false)
  const [resumeHandler, setResumeHandler] = useState<(() => void) | null>(null)
  const [log, setLog] = useState<string[]>([])

  function push(msg: string) {
    setLog(prev => [...prev, msg].slice(-8))
  }

  async function handleBeforeClose({ from, done }: { from: DialogTriggerFrom, done: () => void }) {
    if (from === TriggerFrom.OK_BUTTON) {
      push('beforeClose (async)')
      await new Promise(resolve => setTimeout(resolve, 2000))
      done()
    }
    else {
      push('beforeClose (cancel)')
      done()
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Dialog
          open={openSync}
          lazyMount
          unmountOnExit
          beforeClose={({ done }) => {
            push('beforeClose (call done() to close)')
            done()
          }}
          onOpenChange={(details) => {
            setOpenSync(details.open)
            push(`openChange open=${details.open}`)
          }}
        >
          <Dialog.Trigger asChild>
            <Button>beforeClose 同步 done</Button>
          </Dialog.Trigger>
          <Dialog.Content className="w-120">
            <Dialog.Header>同步关闭</Dialog.Header>
            <Dialog.Body>
              <p className="text-sm text-gray-cc">
                本例在
                {' '}
                <code className="text-gray-ff">beforeClose</code>
                {' '}
                内立即调用
                {' '}
                <code className="text-gray-ff">done()</code>
                。
              </p>
            </Dialog.Body>
            <Dialog.Footer />
          </Dialog.Content>
        </Dialog>

        <Dialog
          open={openAsync}
          lazyMount
          unmountOnExit
          beforeClose={handleBeforeClose}
          onOpenChange={details => setOpenAsync(details.open)}
        >
          <Dialog.Trigger asChild>
            <Button variant="outlined">beforeClose 异步 done</Button>
          </Dialog.Trigger>
          <Dialog.Content className="w-120">
            <Dialog.Header>异步关闭</Dialog.Header>
            <Dialog.Body>
              <p className="text-sm text-gray-cc">
                点击 OK 后约 2000ms 调用
                {' '}
                <code className="text-gray-ff">done()</code>
                {' '}
                才真正关闭。
              </p>
            </Dialog.Body>
            <Dialog.Footer />
          </Dialog.Content>
        </Dialog>

        <Dialog
          open={openResume}
          lazyMount
          unmountOnExit
          beforeClose={({ from, resume }) => {
            push(`beforeClose (resume) from=${from ?? 'unknown'}`)
            setResumeHandler(() => resume)
          }}
          onOpenChange={details => setOpenResume(details.open)}
        >
          <Dialog.Trigger asChild>
            <Button variant="outlined">beforeClose resume</Button>
          </Dialog.Trigger>
          <Dialog.Content className="w-120">
            <Dialog.Header>resume 取消拦截</Dialog.Header>
            <Dialog.Body>
              <p className="text-sm text-gray-cc">
                尝试关闭会进入 beforeClose 且不自动 done。点击「继续编辑」调用
                {' '}
                <code className="text-gray-ff">resume()</code>
                。
              </p>
              {resumeHandler && (
                <Button
                  className="mt-3"
                  variant="outlined"
                  onClick={() => {
                    resumeHandler()
                    setResumeHandler(null)
                    push('resume()')
                  }}
                >
                  继续编辑
                </Button>
              )}
            </Dialog.Body>
            <Dialog.Footer />
          </Dialog.Content>
        </Dialog>
      </div>
      <div className="text-xs font-mono text-gray-cc">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  )
}
