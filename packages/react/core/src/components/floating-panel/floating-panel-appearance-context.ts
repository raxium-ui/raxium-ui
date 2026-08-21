import type { FloatingPanelResizeAxis } from './props'
import { createContext, useContext } from 'react'

export interface FloatingPanelAppearanceContextValue {
  resizeAxis: FloatingPanelResizeAxis
  opacity: number
  pinned: boolean
  setOpacity: (opacity: number) => void
  setPinned: (pinned: boolean) => void
}

export const FloatingPanelAppearanceContext = createContext<FloatingPanelAppearanceContextValue | null>(null)

export function useFloatingPanelAppearance() {
  const ctx = useContext(FloatingPanelAppearanceContext)
  if (!ctx)
    throw new Error('useFloatingPanelAppearance must be used within FloatingPanel')
  return ctx
}
