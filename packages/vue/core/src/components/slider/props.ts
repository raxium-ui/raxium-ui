import type {
  SliderMarkerBaseProps,
  SliderRootBaseProps,
  SliderThumbBaseProps,
  TooltipRootBaseProps,
  UseSliderContext,
} from '@ark-ui/vue'
import type { TooltipArrow, TooltipContentProps } from '@raxium/vue/components/tooltip'
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
  ui?: {
    root?: HTMLAttributes['class']
    dot?: HTMLAttributes['class']
    value?: HTMLAttributes['class']
  }
  interactive?: boolean
  index?: number
}
export interface SliderThumbProps extends SliderThumbBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface SliderTooltipMarkerProps
  extends SliderMarkerBaseProps,
  Omit<TooltipRootBaseProps, 'open'>,
  ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    dot?: HTMLAttributes['class']
    value?: HTMLAttributes['class']
  }
  widget?: {
    tooltipContent?: TooltipContentProps
    tooltipArrow?: ComponentProps<typeof TooltipArrow>
  }
  open?: (context: UnwrapRef<UseSliderContext>) => boolean
  interactive?: boolean
  index?: number
}

export interface SliderTooltipThumbProps
  extends SliderThumbBaseProps,
  Omit<TooltipRootBaseProps, 'open'>,
  ThemeNoCrafts {
  class?: HTMLAttributes['class']
  open?: (context: UnwrapRef<UseSliderContext>) => boolean
  widget?: {
    tooltipContent?: TooltipContentProps
    tooltipArrow?: ComponentProps<typeof TooltipArrow>
  }
}
