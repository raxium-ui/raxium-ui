import type {
  SliderMarkerBaseProps,
  SliderRootBaseProps,
  SliderThumbBaseProps,
  UseSliderContext,
} from '@ark-ui/react/slider'
import type { TooltipRootBaseProps } from '@ark-ui/react/tooltip'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react'
import type { TooltipContentProps } from '../tooltip/props'
import type { ArrowProps as TooltipArrowProps } from '../arrow/createArrow'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface SliderProps extends SliderRootBaseProps, ThemeCrafts<'tvSlider'> {
  className?: ClassName
  prefix?: ReactNode
  suffix?: ReactNode
  ui?: {
    root?: ClassName
    control?: ClassName
    track?: ClassName
    range?: ClassName
  }
  children?: ReactNode
}

export interface SliderMarkerProps extends SliderMarkerBaseProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    root?: ClassName
    dot?: ClassName
    value?: ClassName
  }
  interactive?: boolean
  index?: number
  children?: ReactNode
}

export interface SliderThumbProps extends SliderThumbBaseProps, ThemeNoCrafts {
  className?: ClassName
}

export interface SliderTooltipMarkerProps
  extends SliderMarkerBaseProps,
  Omit<TooltipRootBaseProps, 'open'>,
  ThemeNoCrafts {
  className?: ClassName
  ui?: {
    root?: ClassName
    dot?: ClassName
    value?: ClassName
  }
  widget?: {
    tooltipContent?: TooltipContentProps
    tooltipArrow?: TooltipArrowProps
  }
  open?: (context: UseSliderContext) => boolean
  interactive?: boolean
  index?: number
  content?: ReactNode
  children?: ReactNode
  onTooltipClick?: (event: MouseEvent<HTMLDivElement>) => void
}

export interface SliderTooltipThumbProps
  extends SliderThumbBaseProps,
  Omit<TooltipRootBaseProps, 'open'>,
  ThemeNoCrafts {
  className?: ClassName
  open?: (context: UseSliderContext) => boolean
  widget?: {
    tooltipContent?: TooltipContentProps
    tooltipArrow?: TooltipArrowProps
  }
  children?: ReactNode
}
