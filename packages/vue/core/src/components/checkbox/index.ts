import { withCompoundParts } from '../../utils/withCompoundParts'
import CheckboxRoot from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'

export const Checkbox = withCompoundParts(CheckboxRoot, {
  Group: CheckboxGroup,
})

export { CheckboxGroup }
export * from './props'
