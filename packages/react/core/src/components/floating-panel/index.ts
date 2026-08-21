import {
  FloatingPanelTrigger,
  useFloatingPanelContext,
} from '@ark-ui/react/floating-panel'
import { FloatingPanelRoot } from './FloatingPanel'
import { useFloatingPanelAppearance } from './floating-panel-appearance-context'
import { FloatingPanelCloseTrigger } from './FloatingPanelCloseTrigger'
import { FloatingPanelContent } from './FloatingPanelContent'
import { FloatingPanelHeader } from './FloatingPanelHeader'
import { FloatingPanelOpacityTrigger } from './FloatingPanelOpacityTrigger'
import { FloatingPanelPinTrigger } from './FloatingPanelPinTrigger'
import { FloatingPanelStageTrigger } from './FloatingPanelStageTrigger'

export const FloatingPanel = Object.assign(FloatingPanelRoot, {
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
  useFloatingPanelAppearance,
  useFloatingPanelContext,
}

export type {
  FloatingPanelCloseTriggerProps,
  FloatingPanelContentProps,
  FloatingPanelHeaderProps,
  FloatingPanelOpacityTriggerProps,
  FloatingPanelPinTriggerProps,
  FloatingPanelProps,
  FloatingPanelResizeAxis,
  FloatingPanelStageTriggerProps,
} from './props'
