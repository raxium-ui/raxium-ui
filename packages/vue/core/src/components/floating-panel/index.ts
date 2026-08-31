import { FloatingPanelTrigger } from '@ark-ui/vue'
import { withCompoundParts } from '../../utils/withCompoundParts'
import FloatingPanelRoot from './FloatingPanel.vue'
import FloatingPanelCloseTrigger from './FloatingPanelCloseTrigger.vue'
import FloatingPanelContent from './FloatingPanelContent.vue'
import FloatingPanelHeader from './FloatingPanelHeader.vue'
import FloatingPanelOpacityTrigger from './FloatingPanelOpacityTrigger.vue'
import FloatingPanelPinTrigger from './FloatingPanelPinTrigger.vue'
import FloatingPanelStageTrigger from './FloatingPanelStageTrigger.vue'

export const FloatingPanel = withCompoundParts(FloatingPanelRoot, {
  Trigger: FloatingPanelTrigger,
  Content: FloatingPanelContent,
  Header: FloatingPanelHeader,
  CloseTrigger: FloatingPanelCloseTrigger,
  PinTrigger: FloatingPanelPinTrigger,
  StageTrigger: FloatingPanelStageTrigger,
  OpacityTrigger: FloatingPanelOpacityTrigger,
})

export {
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelHeader,
  FloatingPanelOpacityTrigger,
  FloatingPanelPinTrigger,
  FloatingPanelStageTrigger,
  FloatingPanelTrigger,
}
export * from './props'
