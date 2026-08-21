import { useState } from 'react'
import { Hotkey } from '../index'

export function HotkeyEventsExample() {
  const [hotkey, setHotkey] = useState('')
  const [lines, setLines] = useState<string[]>([])

  function push(line: string) {
    setLines(prev => [line, ...prev].slice(0, 8))
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <Hotkey
        hotkey={hotkey}
        className="w-80"
        onHotkeyChange={setHotkey}
        onFocus={() => push('focus')}
        onBlur={() => push('blur')}
        onError={error => push(`error: ${error.message || 'unknown'}`)}
        onCancel={(codes, hk) => push(`cancel: [${codes.join(', ')}] -> ${hk}`)}
        onChange={(codes, hk) => push(`change: [${codes.join(', ')}] -> ${hk}`)}
      />
      <div className="text-sm text-gray-cc">
        hotkey:
        {' '}
        <span className="text-gray-ff">{hotkey || '(empty)'}</span>
      </div>
      <pre className="w-full max-w-[560px] whitespace-pre-wrap rounded-md bg-gray-0c p-3 text-xs text-gray-cc">
        {lines.length ? lines.join('\n') : '（暂无事件）'}
      </pre>
    </div>
  )
}
