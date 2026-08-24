import { useState } from 'react'
import { Progress } from '../index'

export function ProgressLinearVariantsExample() {
  const [value] = useState(45)

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Progress className="w-80" value={value}>
          <Progress.Linear variant="default" />
        </Progress>
        <span className="text-sm text-gray-ff">default</span>
      </div>

      <div className="flex items-center gap-4">
        <Progress className="w-80" value={value}>
          <Progress.Linear variant="robbin" />
        </Progress>
        <span className="text-sm text-gray-ff">robbin</span>
      </div>

      <div className="flex items-center gap-4">
        <Progress className="w-80" value={value}>
          <Progress.Linear variant="transfer" />
        </Progress>
        <span className="text-sm text-gray-ff">transfer</span>
      </div>
    </div>
  )
}
