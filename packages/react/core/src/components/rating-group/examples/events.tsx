import { useState } from 'react'
import { RatingGroup } from '../index'

const items = [1, 2, 3, 4, 5]

export function RatingGroupEventsExample() {
  const [value, setValue] = useState(3)
  const [lines, setLines] = useState<string[]>([])

  function push(line: string) {
    setLines(prev => [line, ...prev].slice(0, 8))
  }

  const joined = lines.length ? lines.join('\n') : '（暂无事件）'

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-cc">
        监听：onValueChange / onHoverChange
      </div>

      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <RatingGroup
          value={value}
          count={5}
          onValueChange={(details) => {
            setValue(details.value)
            push(`value-change: ${details.value}`)
          }}
          onHoverChange={details => push(`hover-change: ${details.hoveredValue}`)}
        >
          {items.map(index => (
            <RatingGroup.Item key={index} index={index} />
          ))}
        </RatingGroup>
      </div>

      <pre className="w-full max-w-[520px] whitespace-pre-wrap rounded-md bg-gray-0c p-3 text-xs text-gray-cc">
        {joined}
      </pre>
    </div>
  )
}
