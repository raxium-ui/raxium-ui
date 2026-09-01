import { useState } from 'react'
import { Input } from '../index'

export function InputBasicExample() {
  const [text, setText] = useState('')

  return (
    <div className="w-full flex flex-col gap-3">
      <Input className="w-60" defaultValue="Default Value" />
      <Input className="w-60" placeholder="Placeholder" maxLength={5} />
      <Input className="w-60" placeholder="Placeholder" autoComplete="off" />
      <div className="flex items-center gap-3">
        <Input
          className="w-60"
          placeholder="value + onValueChange"
          value={text}
          onValueChange={setText}
        />
        <span className="text-sm text-gray-ff">
          value:
          {' '}
          {text}
        </span>
      </div>
    </div>
  )
}
