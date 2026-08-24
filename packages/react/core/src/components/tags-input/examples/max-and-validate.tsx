import { X } from 'lucide-react'
import { useState } from 'react'
import { TagsInput } from '../index'

function validate(details: { value: string[], inputValue: string }) {
  const next = details.inputValue.trim()
  if (!next)
    return false
  if (next.length < 2)
    return false
  if (details.value.includes(next))
    return false
  return true
}

export function TagsInputMaxAndValidateExample() {
  const [value, setValue] = useState<string[]>(['vue', 'react'])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-cc">
        max=3 + validate（去重、trim、最少 2 个字符）
      </div>

      <div className="w-full max-w-[560px] rounded-md border border-gray-33 p-3">
        <TagsInput
          max={3}
          validate={validate}
          value={value}
          onValueChange={details => setValue(details.value)}
        >
          {value.map((item, index) => (
            <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
              <TagsInput.ItemDeleteTrigger className="ml-1 text-gray-55 hover:text-gray-ff">
                <X className="size-3.5" />
              </TagsInput.ItemDeleteTrigger>
            </TagsInput.Item>
          ))}
        </TagsInput>
      </div>

      <div className="text-xs text-gray-55">
        试试输入重复值、空格、或超过 3 个 tag；会触发 valueInvalid 事件（见 Events 示例）。
      </div>
    </div>
  )
}
