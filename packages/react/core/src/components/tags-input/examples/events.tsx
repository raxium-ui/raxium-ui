import { X } from 'lucide-react'
import { useState } from 'react'
import { TagsInput } from '../index'

export function TagsInputEventsExample() {
  const [value, setValue] = useState<string[]>(['vue', 'react'])
  const [lines, setLines] = useState<string[]>([])

  function push(line: string) {
    setLines(current => [line, ...current].slice(0, 8))
  }

  const joined = lines.length ? lines.join('\n') : '（暂无事件）'

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-cc">
        监听：onValueChange / onHighlightChange / onValueInvalid
      </div>

      <div className="w-full max-w-[560px] rounded-md border border-gray-33 p-3">
        <TagsInput
          max={3}
          value={value}
          onValueChange={(details) => {
            setValue(details.value)
            push(`value-change: [${details.value.join(', ')}]`)
          }}
          onHighlightChange={details => push(`highlight-change: ${details.highlightedValue ?? 'null'}`)}
          onValueInvalid={details => push(`value-invalid: ${details.reason}`)}
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

      <pre className="w-full max-w-[560px] whitespace-pre-wrap rounded-md bg-gray-0c p-3 text-xs text-gray-cc">
        {joined}
      </pre>
    </div>
  )
}
