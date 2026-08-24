import { useState } from 'react'
import { TagsInput } from '../index'

export function TagsInputInlineExample() {
  const [inlineValue, setInlineValue] = useState<string[]>([
    'VeryLongTag-1',
    'VeryLongTag-2',
    'VeryLongTag-3',
    'VeryLongTag-4',
  ])
  const [wrapValue, setWrapValue] = useState<string[]>([
    'Tag-A',
    'Tag-B',
    'Tag-C',
    'Tag-D',
    'Tag-E',
    'Tag-F',
    'Tag-G',
  ])

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full max-w-[560px] flex flex-col gap-3">
        <div className="text-sm text-gray-cc">
          inline=true（横向滚动）
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <TagsInput
            inline
            value={inlineValue}
            onValueChange={details => setInlineValue(details.value)}
          >
            {inlineValue.map((item, index) => (
              <TagsInput.Item key={`${item}-${index}`} index={index} value={item} />
            ))}
          </TagsInput>
        </div>

        <div className="text-sm text-gray-cc">
          inline=false（自动换行）
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <TagsInput
            inline={false}
            value={wrapValue}
            onValueChange={details => setWrapValue(details.value)}
          >
            {wrapValue.map((item, index) => (
              <TagsInput.Item key={`${item}-${index}`} index={index} value={item} />
            ))}
          </TagsInput>
        </div>
      </div>
    </div>
  )
}
