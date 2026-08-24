import { useState } from 'react'
import { Button } from '../../button'
import { Progress } from '../index'

export function ProgressBasicExample() {
  const [value, setValue] = useState(30)

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button variant="outlined" onClick={() => setValue(Math.max(0, value - 10))}>
          -10
        </Button>
        <Button variant="outlined" onClick={() => setValue(Math.min(100, value + 10))}>
          +10
        </Button>
        <span className="text-sm text-gray-ff">
          value:
          {' '}
          {value}
        </span>
      </div>

      <Progress className="w-80" value={value}>
        <Progress.Linear />
      </Progress>
    </div>
  )
}
