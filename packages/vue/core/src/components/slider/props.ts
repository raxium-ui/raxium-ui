import type { SliderMarkerBaseProps, SliderRootBaseProps, SliderThumbBaseProps, TooltipArrow, TooltipContent, TooltipRootBaseProps, UseSliderContext } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

export interface SliderProps extends SliderRootBaseProps, ThemeCrafts<'tvSlider'> {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    track?: HTMLAttributes['class']
    range?: HTMLAttributes['class']
  }
}

export interface SliderMarkerProps extends SliderMarkerBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface SliderThumbProps extends SliderThumbBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface SliderTooltipMarkerProps
  extends SliderMarkerBaseProps,
  Omit<TooltipRootBaseProps, 'open'>,
  ThemeNoCrafts {
  class?: HTMLAttributes['class']
  open?: (context: UnwrapRef<UseSliderContext>) => boolean
}

export interface SliderTooltipThumbProps
  extends SliderThumbBaseProps,
  Omit<TooltipRootBaseProps, 'open'>,
  ThemeNoCrafts {
  class?: HTMLAttributes['class']
  open?: (context: UnwrapRef<UseSliderContext>) => boolean
  widget?: {
    tooltipContent?: ComponentProps<typeof TooltipContent>
    tooltipArrow?: ComponentProps<typeof TooltipArrow>
  }
}
