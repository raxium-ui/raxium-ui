import { THEME_SIZE } from '@raxium/shared/constant'
import { X } from 'lucide-react'
import { useState } from 'react'
import { TagsInput } from '../index'

export function TagsInputSizesExample() {
  const [value, setValue] = useState<string[]>(['Vue', 'React'])

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-sm text-gray-cc">
        xs / sm / base / lg
      </div>

      <div className="w-full max-w-[560px] flex flex-col gap-3">
        {THEME_SIZE.map(size => (
          <div key={size} className="rounded-md border border-gray-33 p-3">
            <TagsInput
              theme={{ size }}
              value={value}
              onValueChange={details => setValue(details.value)}
            >
              {value.map((item, index) => (
                <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
                  <TagsInput.ItemDeleteTrigger className="ml-1 text-gray-55 hover:text-gray-ff">
                    <X className="size-3" />
                  </TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              ))}
            </TagsInput>
          </div>
        ))}
      </div>
    </div>
  )
}
