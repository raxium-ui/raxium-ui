import { useState } from 'react'
import { Button } from '../../button'
import { Switch } from '../index'

export function SwitchControlledExample() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button variant="outlined" onClick={() => setChecked(false)}>Set false</Button>
        <Button variant="outlined" onClick={() => setChecked(true)}>Set true</Button>
        <span className="text-sm text-gray-ff">
          checked:
          {' '}
          {String(checked)}
        </span>
      </div>
      <Switch checked={checked} onCheckedChange={details => setChecked(details.checked)}>
        <Switch.Label>Controlled</Switch.Label>
      </Switch>
    </div>
  )
}
