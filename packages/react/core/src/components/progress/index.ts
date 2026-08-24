import {
  ProgressLabel,
  ProgressValueText,
  ProgressView,
  useProgressContext,
} from '@ark-ui/react/progress'
import { ProgressRoot } from './Progress'
import { ProgressArc } from './ProgressArc'
import { ProgressCircle } from './ProgressCircle'
import { ProgressLinear } from './ProgressLinear'

export const Progress = Object.assign(ProgressRoot, {
  Linear: ProgressLinear,
  Circle: ProgressCircle,
  Arc: ProgressArc,
  Label: ProgressLabel,
  ValueText: ProgressValueText,
  View: ProgressView,
})

export { ProgressArc, ProgressCircle, ProgressLabel, ProgressLinear, ProgressValueText, ProgressView, useProgressContext }
export type { ProgressArcProps, ProgressCircleProps, ProgressLinearProps, ProgressProps } from './props'
