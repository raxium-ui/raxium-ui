import { useState } from 'react'
import { Button } from '../../button'
import { RatingGroup } from '../index'

const items = [1, 2, 3, 4, 5]

export function RatingGroupProgrammaticExample() {
  const [value, setValue] = useState(3)

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outlined" onClick={() => setValue(1)}>
          Set 1
        </Button>
        <Button variant="outlined" onClick={() => setValue(3)}>
          Set 3
        </Button>
        <Button variant="outlined" onClick={() => setValue(5)}>
          Set 5
        </Button>
        <Button variant="outlined" onClick={() => setValue(-1)}>
          Clear
        </Button>
        <div className="text-sm text-gray-cc">
          value:
          {' '}
          <span className="text-gray-ff">{value}</span>
        </div>
      </div>

      <div className="w-full max-w-[520px] rounded-md border border-gray-33 p-3">
        <RatingGroup value={value} count={5} onValueChange={details => setValue(details.value)}>
          {items.map(index => (
            <RatingGroup.Item key={index} index={index} />
          ))}
        </RatingGroup>
      </div>
    </div>
  )
}
