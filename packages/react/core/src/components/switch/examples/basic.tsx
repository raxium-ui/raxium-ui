import { useState } from 'react'
import { Switch } from '../index'

export function SwitchBasicExample() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-ff">
        checked:
        {' '}
        {String(checked)}
      </div>
      <Switch checked={checked} onCheckedChange={details => setChecked(details.checked)} />
    </div>
  )
}
