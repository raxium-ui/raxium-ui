import { withCompoundParts } from '../../utils/withCompoundParts'
import SwitchRoot from './Switch.vue'
import SwitchLabel from './SwitchLabel.vue'

export const Switch = withCompoundParts(SwitchRoot, {
  Label: SwitchLabel,
})

export { SwitchLabel }
export * from './props'
