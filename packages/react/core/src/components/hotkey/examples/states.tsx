import { useState } from 'react'
import { Hotkey } from '../index'

export function HotkeyStatesExample() {
  const [normal, setNormal] = useState('Ctrl + Shift + K')

  return (
    <div className="w-full flex flex-col gap-3">
      <Hotkey hotkey={normal} className="w-80" onHotkeyChange={setNormal} />
      <Hotkey hotkey="" className="w-80" disabled />
      <Hotkey hotkey="Ctrl + Shift + P" className="w-80" readOnly />
    </div>
  )
}
