import { useState } from 'react'
import { NumberInput } from '../index'

export function NumberInputFormatExample() {
  const [price, setPrice] = useState('1234.5')
  const [percent, setPercent] = useState('0.25')

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full max-w-[520px] flex flex-col gap-3">
        <div className="text-sm text-gray-cc">
          locale + formatOptions（currency）
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <NumberInput
            value={price}
            showTrigger
            locale="zh-CN"
            formatOptions={{ style: 'currency', currency: 'CNY' }}
            min={0}
            step={1}
            onValueChange={details => setPrice(details.value)}
          />
        </div>

        <div className="text-sm text-gray-cc">
          clampValueOnBlur=false（允许暂时输入超范围）
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <NumberInput
            value={percent}
            showTrigger
            min={0}
            max={1}
            step={0.05}
            clampValueOnBlur={false}
            onValueChange={details => setPercent(details.value)}
          />
        </div>
      </div>
    </div>
  )
}
