import type {
  ProgressCircleBaseProps,
  ProgressRootBaseProps,
  ProgressTrackBaseProps,
} from '@ark-ui/react/progress'
import type { ThemeCrafts, ThemeNoCrafts, ThemeProps } from '@raxium/react/providers/theme'
import type { ProgressVariants } from '@raxium/themes/default'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface ProgressCircleTheme extends Omit<ThemeNoCrafts, 'theme'> {
  theme?: Omit<ThemeProps, 'size'> & { size?: ProgressVariants['size'] | number }
}

export interface ProgressProps extends ProgressRootBaseProps, ThemeCrafts<'tvProgress'> {
  className?: ClassName
  children?: ReactNode
}

export interface ProgressLinearProps extends ProgressTrackBaseProps, ThemeNoCrafts {
  className?: ClassName
  variant?: 'default' | 'robbin' | 'transfer'
  ui?: {
    track?: ClassName
    range?: ClassName
  }
}

export interface ProgressCircleProps extends ProgressCircleBaseProps, ProgressCircleTheme {
  className?: ClassName
  variant?: 'default' | 'transfer'
  ui?: {
    circle?: ClassName
    circleTrack?: ClassName
    circleRange?: ClassName
  }
}

export interface ProgressArcProps extends ProgressCircleBaseProps, ProgressCircleTheme {
  className?: ClassName
  theta?: number
  variant?: 'default' | 'transfer'
  ui?: {
    circle?: ClassName
    circleTrack?: ClassName
    circleRange?: ClassName
  }
}
