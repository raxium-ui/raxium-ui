import type { FloatingPanelResizeTriggerAxis } from '@ark-ui/react/floating-panel'
import type { ReactNode } from 'react'
import type { FloatingPanelResizeAxis } from './props'
import { FloatingPanel as ArkFloatingPanel } from '@ark-ui/react/floating-panel'

export function floatingPanelResizeTriggers(
  axis: FloatingPanelResizeAxis,
  classNames: {
    resizeVertical?: string
    resizeHorizontal?: string
    resizeCorner?: string
  },
): ReactNode {
  const line = (ax: FloatingPanelResizeTriggerAxis, className?: string) => (
    <ArkFloatingPanel.ResizeTrigger key={ax} axis={ax} className={className} />
  )

  switch (axis) {
    case 'x':
      return ['e', 'w'].map(ax => line(ax as FloatingPanelResizeTriggerAxis, classNames.resizeVertical))
    case 'y':
      return ['n', 's'].map(ax => line(ax as FloatingPanelResizeTriggerAxis, classNames.resizeHorizontal))
    case 'xy':
      return (['e', 'w', 'n', 's'] as const).map(ax =>
        line(ax, ax === 'e' || ax === 'w' ? classNames.resizeVertical : classNames.resizeHorizontal),
      )
    case 'xyc':
      return (['e', 'w', 'n', 's', 'ne', 'nw', 'se', 'sw'] as const).map((ax) => {
        if (ax.length === 1) {
          return line(
            ax,
            ax === 'e' || ax === 'w' ? classNames.resizeVertical : classNames.resizeHorizontal,
          )
        }
        return line(ax, classNames.resizeCorner)
      })
    case 'custom':
      return null
    default: {
      const _exhaustive: never = axis
      return _exhaustive
    }
  }
}
