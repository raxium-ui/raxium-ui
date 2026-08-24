import { useState } from 'react'
import { Slider } from '../index'

export function SliderRangeExample() {
  const [value, setValue] = useState([20, 70])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-cc">
        defaultValue: [20, 70]
        value:
        {' '}
        {JSON.stringify(value)}
      </div>

      <Slider
        className="w-80"
        min={0}
        max={100}
        step={5}
        value={value}
        onValueChange={details => setValue(details.value)}
      >
        <Slider.Thumb index={0} />
        <Slider.Thumb index={1} />
      </Slider>
    </div>
  )
}
