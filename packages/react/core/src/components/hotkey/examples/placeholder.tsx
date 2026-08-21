import { useState } from 'react'
import { Hotkey } from '../index'

function placeholderFn(focused: boolean) {
  return focused ? '请按下组合键（如 Ctrl + Shift + K）' : '未设置热键'
}

export function HotkeyPlaceholderExample() {
  const [empty1, setEmpty1] = useState('')
  const [empty2, setEmpty2] = useState('')

  return (
    <div className="w-full flex flex-col gap-3">
      <Hotkey hotkey={empty1} className="w-80" placeholder="自定义占位文案" onHotkeyChange={setEmpty1} />
      <Hotkey hotkey={empty2} className="w-80" placeholder={placeholderFn} onHotkeyChange={setEmpty2} />
    </div>
  )
}
