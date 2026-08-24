import { useState } from 'react'
import { Button } from '../../button'
import { Slider } from '../index'

export function SliderControlledExample() {
  const [value, setValue] = useState([10])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button variant="outlined" onClick={() => setValue([0])}>
          Set 0
        </Button>
        <Button variant="outlined" onClick={() => setValue([50])}>
          Set 50
        </Button>
        <Button variant="outlined" onClick={() => setValue([100])}>
          Set 100
        </Button>
        <span className="text-sm text-gray-ff">
          value:
          {' '}
          {value[0]}
        </span>
      </div>

      <Slider
        className="w-90"
        min={0}
        max={100}
        step={1}
        value={value}
        onValueChange={details => setValue(details.value)}
      >
        <Slider.TooltipThumb index={0} />
      </Slider>
    </div>
  )
}
