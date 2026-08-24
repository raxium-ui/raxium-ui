import { useState } from 'react'
import { Slider } from '../index'

export function SliderVerticalAndDisabledExample() {
  const [verticalValue, setVerticalValue] = useState([60])

  return (
    <div className="w-full flex flex-wrap items-start gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-ff">
          vertical:
          {' '}
          {verticalValue[0]}
        </div>
        <Slider
          orientation="vertical"
          className="h-60"
          value={verticalValue}
          onValueChange={details => setVerticalValue(details.value)}
          ui={{
            root: 'h-60',
            control: 'h-60 w-8 justify-center',
            track: 'h-full w-1',
            range: 'w-full',
          }}
        >
          <Slider.TooltipThumb index={0} positioning={{ placement: 'right' }} />
        </Slider>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-ff">
          disabled
        </div>
        <Slider className="w-80" defaultValue={[30]} disabled>
          <Slider.TooltipThumb index={0} open={() => true} />
        </Slider>
      </div>
    </div>
  )
}
