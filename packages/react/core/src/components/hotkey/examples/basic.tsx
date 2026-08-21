import { useState } from 'react'
import { Hotkey } from '../index'

export function HotkeyBasicExample() {
  const [hotkey, setHotkey] = useState('')

  return (
    <div className="w-full flex flex-col gap-2">
      <Hotkey hotkey={hotkey} className="w-80" onHotkeyChange={setHotkey} />
      <div className="text-sm text-gray-cc">
        hotkey:
        {' '}
        <span className="text-gray-ff">{hotkey || '(empty)'}</span>
      </div>
    </div>
  )
}
