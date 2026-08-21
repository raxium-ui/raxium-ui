import { Icon } from '../index'

export function IconBasicExample() {
  return (
    <div className="flex items-center gap-4">
      <Icon icon="lucide:plus" />
      <Icon icon="lucide:check" />
      <Icon icon="lucide:x" />
      <Icon icon="lucide:loader-circle" className="animate-spin" />
    </div>
  )
}
