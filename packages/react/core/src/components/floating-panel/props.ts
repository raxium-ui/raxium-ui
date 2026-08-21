import type {
  FloatingPanelCloseTriggerProps as ArkFloatingPanelCloseTriggerProps,
  FloatingPanelContentProps as ArkFloatingPanelContentProps,
  FloatingPanelHeaderProps as ArkFloatingPanelHeaderProps,
  FloatingPanelRootBaseProps,
  FloatingPanelStageTriggerProps as ArkFloatingPanelStageTriggerProps,
} from '@ark-ui/react/floating-panel'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export type FloatingPanelResizeAxis = 'x' | 'y' | 'xy' | 'xyc' | 'custom'

export interface FloatingPanelProps extends FloatingPanelRootBaseProps, ThemeCrafts<'tvFloatingPanel'> {
  className?: ClassName
  opacity?: number
  pinned?: boolean
  resizeAxis?: FloatingPanelResizeAxis
  children?: ReactNode
}

export interface FloatingPanelCloseTriggerProps extends ArkFloatingPanelCloseTriggerProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface FloatingPanelContentProps extends ArkFloatingPanelContentProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    positioner?: ClassName
    content?: ClassName
    resizeVertical?: ClassName
    resizeHorizontal?: ClassName
    resizeCorner?: ClassName
  }
  children?: ReactNode
}

export interface FloatingPanelHeaderProps extends ArkFloatingPanelHeaderProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    root?: ClassName
    title?: ClassName
    control?: ClassName
  }
  /** Replaces Vue `#control`. */
  control?: ReactNode
  children?: ReactNode
}

export interface FloatingPanelOpacityTriggerProps extends ThemeNoCrafts, ButtonHTMLAttributes<HTMLButtonElement> {
  className?: ClassName
  asChild?: boolean
  children?: ReactNode
}

export interface FloatingPanelPinTriggerProps extends ThemeNoCrafts, ButtonHTMLAttributes<HTMLButtonElement> {
  className?: ClassName
  asChild?: boolean
  children?: ReactNode
}

export interface FloatingPanelStageTriggerProps extends ArkFloatingPanelStageTriggerProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}
