import { ProgressLabel, ProgressValueText, ProgressView } from '@ark-ui/vue/progress'
import { withCompoundParts } from '../../utils/withCompoundParts'
import ProgressRoot from './Progress.vue'
import ProgressArc from './ProgressArc.vue'
import ProgressCircle from './ProgressCircle.vue'
import ProgressLinear from './ProgressLinear.vue'

export const Progress = withCompoundParts(ProgressRoot, {
  Linear: ProgressLinear,
  Circle: ProgressCircle,
  Arc: ProgressArc,
  Label: ProgressLabel,
  ValueText: ProgressValueText,
  View: ProgressView,
})

export {
  ProgressArc,
  ProgressCircle,
  ProgressLabel,
  ProgressLinear,
  ProgressValueText,
  ProgressView,
}
export * from './props'
