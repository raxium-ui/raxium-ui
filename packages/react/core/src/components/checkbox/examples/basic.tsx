import { useState } from 'react'
import { Checkbox } from '../index'

export function CheckboxBasicExample() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={details => setChecked(details.checked === true)}
      label="Checkbox"
    />
  )
}
