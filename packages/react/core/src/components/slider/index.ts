import { SliderMarkerGroup, useSliderContext } from '@ark-ui/react/slider'
import { SliderRoot } from './Slider'
import { SliderMarker } from './SliderMarker'
import { SliderThumb } from './SliderThumb'
import { SliderTooltipMarker } from './SliderTooltipMarker'
import { SliderTooltipThumb } from './SliderTooltipThumb'

export const Slider = Object.assign(SliderRoot, {
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
  useSliderContext,
}

export type {
  SliderMarkerProps,
  SliderProps,
  SliderThumbProps,
  SliderTooltipMarkerProps,
  SliderTooltipThumbProps,
} from './props'
