import { Icon } from '../index'

export function IconSizesExample() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 text-xs">
        <Icon icon="lucide:star" />
        <span className="text-gray-ff">xs</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Icon icon="lucide:star" />
        <span className="text-gray-ff">sm</span>
      </div>
      <div className="flex items-center gap-2 text-base">
        <Icon icon="lucide:star" />
        <span className="text-gray-ff">base</span>
      </div>
      <div className="flex items-center gap-2 text-lg">
        <Icon icon="lucide:star" />
        <span className="text-gray-ff">lg</span>
      </div>
    </div>
  )
}
