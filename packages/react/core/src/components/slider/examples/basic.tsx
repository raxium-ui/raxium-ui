import { useState } from 'react'
import { Slider } from '../index'

export function SliderBasicExample() {
  const [value, setValue] = useState([30])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-ff">
        value:
        {' '}
        {value[0]}
      </div>

      <Slider
        className="w-80"
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
