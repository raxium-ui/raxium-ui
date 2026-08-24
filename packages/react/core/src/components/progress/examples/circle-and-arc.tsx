import { THEME_SIZE } from '@raxium/shared/constant'
import { useState } from 'react'
import { Progress } from '../index'

export function ProgressCircleAndArcExample() {
  const [value] = useState(70)

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="text-sm text-gray-ff">Circle (default)</div>
        <div className="flex items-center gap-4">
          {THEME_SIZE.map(size => (
            <Progress key={String(size)} value={value}>
              <Progress.Circle theme={{ size }} />
            </Progress>
          ))}
          <Progress value={value}>
            <Progress.Circle theme={{ size: 120 }} />
          </Progress>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm text-gray-ff">Circle (transfer)</div>
        <div className="flex items-center gap-4">
          {THEME_SIZE.map(size => (
            <Progress key={`t-${String(size)}`} value={value}>
              <Progress.Circle theme={{ size }} variant="transfer" />
            </Progress>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm text-gray-ff">Arc (transfer + theta)</div>
        <div className="flex items-center gap-4">
          {THEME_SIZE.map(size => (
            <Progress key={`a-${String(size)}`} value={value}>
              <Progress.Arc theme={{ size }} variant="transfer" theta={60} />
            </Progress>
          ))}
          <Progress value={value}>
            <Progress.Arc theme={{ size: 120 }} variant="transfer" theta={120} />
          </Progress>
        </div>
      </div>
    </div>
  )
}
