import type { crafts } from '@raxium/themes/default'

type SliderTvSlots = ReturnType<(typeof crafts)['tvSlider']>

/** tailwind-variants 推断会漏掉 `markerValue`，运行时已存在此槽。 */
export type SliderTvWithMarkerValue = SliderTvSlots & {
  markerValue: SliderTvSlots['markerDot']
}

export function resolveSliderTv(slots: SliderTvSlots): SliderTvWithMarkerValue {
  return slots as SliderTvWithMarkerValue
}
