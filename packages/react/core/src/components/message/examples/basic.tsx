import { Button } from '../../button'
import { useMessage } from '../index'

export function MessageBasicExample() {
  const { message } = useMessage()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={() => message.info({ description: 'Info message' })}>Info</Button>
      <Button onClick={() => message.success({ description: 'Success message' })}>Success</Button>
      <Button onClick={() => message.warning({ description: 'Warning message' })}>Warning</Button>
      <Button onClick={() => message.error({ description: 'Error message' })}>Error</Button>
    </div>
  )
}
