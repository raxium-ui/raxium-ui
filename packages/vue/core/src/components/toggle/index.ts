import { ToggleIndicator } from '@ark-ui/vue/toggle'
import { withCompoundParts } from '../../utils/withCompoundParts'
import ToggleRoot from './Toggle.vue'

export const Toggle = withCompoundParts(ToggleRoot, {
  Indicator: ToggleIndicator,
})

export { ToggleIndicator }
export * from './props'
