import { Icon } from '../index'

export function IconColorAndClassExample() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Icon icon="lucide:circle" className="text-rz-green" />
        <span className="text-xs text-gray-ff">text-* controls color</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon="lucide:circle" className="text-gray-55" />
        <span className="text-xs text-gray-ff">muted</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon="lucide:circle" className="text-rz-red" />
        <span className="text-xs text-gray-ff">alert</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon="lucide:circle" className="[&>svg]:stroke-3" />
        <span className="text-xs text-gray-ff">custom stroke</span>
      </div>
    </div>
  )
}
