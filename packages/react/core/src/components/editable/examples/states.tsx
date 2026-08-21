import { useState } from 'react'
import { Editable } from '../index'

export function EditableStatesExample() {
  const [value, setValue] = useState('')

  return (
    <div className="w-full flex flex-col gap-4">
      <Editable
        value={value}
        placeholder="Empty value shows placeholder"
        onValueChange={details => setValue(details.value)}
      >
        <Editable.Input clearable />
        <Editable.Preview />
      </Editable>

      <Editable defaultValue="Default value" placeholder="Edit me" disabled>
        <Editable.Input clearable />
        <Editable.Preview />
      </Editable>

      <Editable defaultValue="Read only" placeholder="Edit me" readOnly>
        <Editable.Input clearable />
        <Editable.Preview />
      </Editable>
    </div>
  )
}
