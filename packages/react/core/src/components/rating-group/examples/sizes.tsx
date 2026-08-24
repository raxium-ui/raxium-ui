import { THEME_SIZE } from '@raxium/shared/constant'
import { useState } from 'react'
import { RatingGroup } from '../index'

const items = [1, 2, 3, 4, 5]

export function RatingGroupSizesExample() {
  const [value, setValue] = useState(3)

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-sm text-gray-cc">
        xs / sm / base / lg
      </div>

      <div className="w-full max-w-[520px] flex flex-col gap-3 rounded-md border border-gray-33 p-3">
        {THEME_SIZE.map(size => (
          <RatingGroup
            key={size}
            value={value}
            theme={{ size }}
            count={5}
            onValueChange={details => setValue(details.value)}
          >
            {items.map(index => (
              <RatingGroup.Item key={index} index={index} />
            ))}
          </RatingGroup>
        ))}
      </div>
    </div>
  )
}
