import { useState } from 'react'
import { RatingGroup } from '../index'

const items = [1, 2, 3, 4, 5]

export function RatingGroupAllowHalfExample() {
  const [value, setValue] = useState(2.5)

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        value:
        {' '}
        <span className="text-gray-ff">{value}</span>
        （allow-half）
      </div>

      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <RatingGroup
          value={value}
          allowHalf
          count={5}
          onValueChange={details => setValue(details.value)}
        >
          {items.map(index => (
            <RatingGroup.Item key={index} index={index} />
          ))}
        </RatingGroup>
      </div>
    </div>
  )
}
