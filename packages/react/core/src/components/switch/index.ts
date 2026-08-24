import { useSwitchContext } from '@ark-ui/react/switch'
import { SwitchRoot } from './Switch'
import { SwitchLabel } from './SwitchLabel'

export const Switch = Object.assign(SwitchRoot, {
  Label: SwitchLabel,
})

export { SwitchLabel, useSwitchContext }
export type { SwitchLabelProps, SwitchProps } from './props'
