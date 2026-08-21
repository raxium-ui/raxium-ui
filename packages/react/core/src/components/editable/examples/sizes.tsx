import { THEME_SIZE } from '@raxium/shared/constant'
import { useState } from 'react'
import { Editable } from '../index'

export function EditableSizesExample() {
  const [value, setValue] = useState('Size demo')

  return (
    <div className="w-full flex flex-col gap-4">
      {THEME_SIZE.map(size => (
        <Editable
          key={size}
          value={value}
          theme={{ size }}
          placeholder={size}
          onValueChange={details => setValue(details.value)}
        >
          <Editable.Input clearable />
          <Editable.Preview />
        </Editable>
      ))}
    </div>
  )
}
