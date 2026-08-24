import { useState } from 'react'
import { TagsInput } from '../index'

export function TagsInputBasicExample() {
  const [value, setValue] = useState<string[]>(['Vue', 'React'])

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        values:
        {' '}
        <span className="text-gray-ff">{value.length ? value.join(', ') : '(empty)'}</span>
      </div>

      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <TagsInput value={value} onValueChange={details => setValue(details.value)}>
          {value.map((item, index) => (
            <TagsInput.Item key={`${item}-${index}`} index={index} value={item} />
          ))}
        </TagsInput>
      </div>
    </div>
  )
}
