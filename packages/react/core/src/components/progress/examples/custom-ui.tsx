import { useState } from 'react'
import { Progress } from '../index'

export function ProgressCustomUiExample() {
  const [value] = useState(35)

  return (
    <div className="w-full flex flex-col gap-4">
      <Progress className="w-80" value={value}>
        <Progress.Linear
          ui={{
            track: 'bg-gray-22 border border-gray-55',
            range: 'bg-rz-green',
          }}
        />
      </Progress>

      <Progress className="w-80" value={value}>
        <Progress.Linear
          variant="transfer"
          ui={{
            track: 'bg-gray-22 border border-gray-55',
            range: 'bg-rz-green',
          }}
        />
      </Progress>
    </div>
  )
}
