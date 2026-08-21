import { useState } from 'react'
import { Editable } from '../index'

export function EditableBasicExample() {
  const [value, setValue] = useState('Editable text')

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-ff">
        value:
        {' '}
        {value}
      </div>
      <Editable value={value} placeholder="Edit me" onValueChange={details => setValue(details.value)}>
        <Editable.Input clearable />
        <Editable.Preview />
      </Editable>
    </div>
  )
}
