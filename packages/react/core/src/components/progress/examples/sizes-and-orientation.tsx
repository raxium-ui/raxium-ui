import { THEME_SIZE } from '@raxium/shared/constant'
import { useState } from 'react'
import { Progress } from '../index'

export function ProgressSizesAndOrientationExample() {
  const [value] = useState(65)

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="text-sm text-gray-ff">Horizontal sizes</div>
        {THEME_SIZE.map(size => (
          <Progress
            key={String(size)}
            className="w-80"
            value={value}
            theme={{ size }}
          >
            <Progress.Linear />
          </Progress>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm text-gray-ff">Vertical sizes</div>
        <div className="flex items-end gap-6">
          {THEME_SIZE.map(size => (
            <Progress
              key={`v-${String(size)}`}
              className="h-30"
              orientation="vertical"
              value={value}
              theme={{ size }}
            >
              <Progress.Linear />
            </Progress>
          ))}
        </div>
      </div>
    </div>
  )
}
