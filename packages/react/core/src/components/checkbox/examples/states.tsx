import type { CheckedState } from '../index'
import { useState } from 'react'
import { Checkbox } from '../index'

export function CheckboxStatesExample() {
  const [checked, setChecked] = useState<CheckedState>(true)

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={details => setChecked(details.checked)}
          label="Controlled"
        />
        <span className="text-sm text-gray-ff">
          checked:
          {` ${String(checked)}`}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox defaultChecked="indeterminate" label="Default indeterminate" />
        <Checkbox defaultChecked={false} label="Default unchecked" />
        <Checkbox defaultChecked label="Default checked" />
      </div>

      <div className="flex items-center gap-3">
        <Checkbox label="Disabled" disabled />
        <Checkbox defaultChecked="indeterminate" label="Disabled indeterminate" disabled />
        <Checkbox defaultChecked label="Disabled checked" disabled />
      </div>
    </div>
  )
}
