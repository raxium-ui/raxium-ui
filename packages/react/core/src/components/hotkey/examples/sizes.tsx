import { THEME_SIZE } from '@raxium/shared/constant'
import { useState } from 'react'
import { Hotkey } from '../index'

export function HotkeySizesExample() {
  const [hotkey, setHotkey] = useState('')

  return (
    <div className="w-full flex flex-col gap-3">
      {THEME_SIZE.map(size => (
        <div key={size} className="flex items-center gap-3">
          <div className="w-18 text-sm text-gray-cc">{size}</div>
          <Hotkey hotkey={hotkey} className="w-80" theme={{ size }} onHotkeyChange={setHotkey} />
        </div>
      ))}
    </div>
  )
}
