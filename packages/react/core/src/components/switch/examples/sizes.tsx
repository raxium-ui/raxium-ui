import { THEME_SIZE } from '@raxium/shared/constant'
import { Switch } from '../index'

export function SwitchSizesExample() {
  return (
    <div className="w-full flex flex-wrap items-center gap-6">
      {THEME_SIZE.map(size => (
        <div key={size} className="flex items-center gap-2">
          <span className="text-sm text-gray-ff">{size}</span>
          <Switch theme={{ size }} />
        </div>
      ))}
    </div>
  )
}
