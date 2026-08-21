import type { CheckedState } from '../index'
import { useState } from 'react'
import { Checkbox, useCheckboxContext } from '../index'

function MixedMark() {
  const checkbox = useCheckboxContext()
  const checkedState: CheckedState = checkbox.indeterminate
    ? 'indeterminate'
    : checkbox.checked

  return (
    <span className="text-[10px] font-bold leading-none text-black">
      {checkedState === 'indeterminate' ? '-' : checkedState ? '✓' : ''}
    </span>
  )
}

export function CheckboxIndicatorExample() {
  const [checked, setChecked] = useState<CheckedState>('indeterminate')
  const text = checked === true ? 'checked' : checked === 'indeterminate' ? 'mixed' : 'unchecked'

  return (
    <div className="w-full flex items-center gap-6">
      <Checkbox
        checked={checked}
        onCheckedChange={details => setChecked(details.checked)}
        indicator={<MixedMark />}
        ui={{
          control: 'border-rz-green data-[state=checked]:bg-rz-green data-[state=indeterminate]:bg-rz-green',
          label: 'select-none',
        }}
        label={(
          <span className="text-sm">
            Custom indicator (
            {text}
            )
          </span>
        )}
      />

      <Checkbox
        id="checkbox-indicator-required"
        label="Required + name/value"
        name="accept"
        value="yes"
        required
      />
    </div>
  )
}
