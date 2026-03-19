import type { FloatingPanelCloseTriggerBaseProps, FloatingPanelContentBaseProps, FloatingPanelHeaderBaseProps, FloatingPanelRootBaseProps, FloatingPanelStageTriggerBaseProps, PolymorphicProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type {
  OpenChangeDetails,
  PositionChangeDetails,
  SizeChangeDetails,
  StageChangeDetails,
} from '@zag-js/floating-panel'
import type { HTMLAttributes } from 'vue'

export interface FloatingPanelProps extends FloatingPanelRootBaseProps, ThemeCrafts<'tvFloatingPanel'> {
  class?: HTMLAttributes['class']
  opacity?: number
  pinned?: boolean
  resizeAxis?: 'x' | 'y' | 'xy' | 'xyc' | 'custom'
}
/**
 * address ts __VLS_export error
 * @description The emits of the FloatingPanelRoot component.
 */
export interface FloatingPanelRootEmits {
  'exitComplete': []
  'openChange': [details: OpenChangeDetails]
  'update:open': [open: boolean]
  'positionChange': [details: PositionChangeDetails]
  'update:position': [details: PositionChangeDetails['position']]
  'positionChangeEnd': [details: PositionChangeDetails]
  'sizeChange': [details: SizeChangeDetails]
  'update:size': [details: SizeChangeDetails['size']]
  'sizeChangeEnd': [details: SizeChangeDetails]
  'stageChange': [details: StageChangeDetails]
}

export interface FloatingPanelCloseTriggerProps extends FloatingPanelCloseTriggerBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}

export interface FloatingPanelContentProps extends FloatingPanelContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    resizeVertical?: HTMLAttributes['class']
    resizeHorizontal?: HTMLAttributes['class']
    resizeCorner?: HTMLAttributes['class']
  }
}

export interface FloatingPanelHeaderProps extends FloatingPanelHeaderBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    title?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
  }
}

export interface FloatingPanelOpacityTriggerProps extends PolymorphicProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}

export interface FloatingPanelPinTriggerProps extends PolymorphicProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}

export interface FloatingPanelStageTriggerProps extends FloatingPanelStageTriggerBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
