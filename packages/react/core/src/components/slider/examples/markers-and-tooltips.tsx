import { useState } from 'react'
import { Slider } from '../index'

export function SliderMarkersAndTooltipsExample() {
  const [value, setValue] = useState([100])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-ff">
        value:
        {' '}
        {value[0]}
      </div>

      <div className="flex flex-col gap-40">
        <Slider
          className="w-90"
          theme={{ size: 'lg' }}
          min={0}
          max={100}
          step={1}
          value={value}
          onValueChange={details => setValue(details.value)}
          suffix={(
            <Slider.MarkerGroup>
              <Slider.Marker value={0} />
              <Slider.Marker value={25} />
              <Slider.TooltipMarker value={50} theme={{ surface: 'razer' }} content="Mid: 50" />
              <Slider.Marker value={75} />
              <Slider.Marker value={100} />
            </Slider.MarkerGroup>
          )}
        >
          <Slider.TooltipThumb
            index={0}
            theme={{ surface: 'razer' }}
            positioning={{ placement: 'top' }}
          />
        </Slider>

        <Slider
          className="w-full"
          theme={{ size: 'lg' }}
          value={value}
          onValueChange={details => setValue(details.value)}
          suffix={(
            <Slider.MarkerGroup>
              <Slider.Marker value={10} interactive />
              <Slider.TooltipMarker value={20} theme={{ surface: 'razer' }} interactive />
              <Slider.TooltipMarker
                value={50}
                theme={{ surface: value[0] >= 50 ? 'razer' : 'dark' }}
                interactive
              />
              <Slider.TooltipMarker value={100} />
            </Slider.MarkerGroup>
          )}
        >
          <Slider.TooltipThumb
            index={0}
            open={() => true}
            positioning={{ placement: 'top' }}
          />
        </Slider>
      </div>
    </div>
  )
}
