import { useCheckboxContext } from '@ark-ui/react/checkbox'
import { CheckboxRoot } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'

export const Checkbox = Object.assign(CheckboxRoot, {
  Group: CheckboxGroup,
})

export { CheckboxGroup, useCheckboxContext }
export type { CheckboxGroupProps, CheckboxProps, CheckedState } from './props'
