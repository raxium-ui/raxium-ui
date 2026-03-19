import type { ProgressCircleBaseProps, ProgressRootBaseProps, ProgressTrackBaseProps } from '@ark-ui/vue'
import type { ProgressVariants } from '@raxium/themes/default'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface ProgressCircleTheme extends Omit<ThemeNoCrafts, 'size'> {
  size?: ProgressVariants['size'] | number
}

export interface ProgressProps extends ProgressRootBaseProps, ThemeCrafts<'tvProgress'> {
  class?: HTMLAttributes['class']
}

export interface ProgressArcProps extends ProgressCircleBaseProps {
  class?: HTMLAttributes['class']
  theta?: number // degree of blank space default is 60
  variant?: 'default' | 'transfer'
  ui?: {
    circle?: HTMLAttributes['class']
    circleTrack?: HTMLAttributes['class']
    circleRange?: HTMLAttributes['class']
  }
  theme?: Omit<ProgressCircleTheme, 'crafts'>
}

export interface ProgressCircleProps extends ProgressCircleBaseProps {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'transfer'
  ui?: {
    circle?: HTMLAttributes['class']
    circleTrack?: HTMLAttributes['class']
    circleRange?: HTMLAttributes['class']
  }
  theme?: Omit<ProgressCircleTheme, 'crafts'>
}

export interface ProgressLinearProps extends ProgressTrackBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'robbin' | 'transfer'
  ui?: {
    track?: HTMLAttributes['class']
    range?: HTMLAttributes['class']
  }
}
