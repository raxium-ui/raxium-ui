import { Button } from '../../button'
import { useToast } from '../index'
import type { ToastOptions } from '../index'

export function ToastBasicExample() {
  const { toast } = useToast()

  function create(options: ToastOptions) {
    toast.create({
      title: 'Hello, world!',
      description: 'This is a toast.',
      ...options,
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={() => create({ type: 'info' })}>Info</Button>
      <Button onClick={() => create({ type: 'success' })}>Success</Button>
      <Button onClick={() => create({ type: 'warning' })}>Warning</Button>
      <Button onClick={() => create({ type: 'error' })}>Error</Button>
      <Button onClick={() => create({ type: 'loading' })}>Loading</Button>
    </div>
  )
}
