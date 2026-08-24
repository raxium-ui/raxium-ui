import { THEME_SIZE } from '@raxium/shared/constant'
import { Slider } from '../index'

export function SliderSizesExample() {
  return (
    <div className="w-full flex flex-col gap-10">
      {THEME_SIZE.map(size => (
        <Slider key={String(size)} className="w-80" theme={{ size }} defaultValue={[25]}>
          <Slider.TooltipThumb index={0} open={() => true} />
        </Slider>
      ))}
    </div>
  )
}
