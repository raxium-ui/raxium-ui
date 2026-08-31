import { SliderMarkerGroup } from '@ark-ui/vue/slider'
import { withCompoundParts } from '../../utils/withCompoundParts'
import SliderRoot from './Slider.vue'
import SliderMarker from './SliderMarker.vue'
import SliderThumb from './SliderThumb.vue'
import SliderTooltipMarker from './SliderTooltipMarker.vue'
import SliderTooltipThumb from './SliderTooltipThumb.vue'

export const Slider = withCompoundParts(SliderRoot, {
  Thumb: SliderThumb,
  Marker: SliderMarker,
  MarkerGroup: SliderMarkerGroup,
  TooltipThumb: SliderTooltipThumb,
  TooltipMarker: SliderTooltipMarker,
})

export {
  SliderMarker,
  SliderMarkerGroup,
  SliderThumb,
  SliderTooltipMarker,
  SliderTooltipThumb,
}
export * from './props'
