import { Switch } from '../index'

export function SwitchStatesExample() {
  return (
    <div className="w-full flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-ff">unchecked</span>
        <Switch />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-ff">checked</span>
        <Switch checked />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-ff">disabled</span>
        <Switch disabled />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-ff">disabled + checked</span>
        <Switch disabled checked />
      </div>
    </div>
  )
}
