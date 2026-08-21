import type { FloatingPanelProps } from './props'
import { FloatingPanel as ArkFloatingPanel } from '@ark-ui/react/floating-panel'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { clamp } from 'es-toolkit'
import { useCallback, useMemo, useState } from 'react'
import { FloatingPanelAppearanceContext } from './floating-panel-appearance-context'

export function FloatingPanelRoot({
  className: _className,
  theme: propsTheme,
  craft,
  opacity: propsOpacity = 100,
  pinned: propsPinned = false,
  resizeAxis = 'xyc',
  draggable = true,
  children,
  ...props
}: FloatingPanelProps) {
  const [pinned, setPinnedState] = useState(propsPinned)
  const [opacity, setOpacityState] = useState(propsOpacity)
  const setPinned = useCallback((next: boolean) => {
    setPinnedState(next)
  }, [])
  const setOpacity = useCallback((next: number) => {
    setOpacityState(clamp(next, 0, 100))
  }, [])
  const appearance = useMemo(
    () => ({ resizeAxis, opacity, pinned, setOpacity, setPinned }),
    [opacity, pinned, resizeAxis, setOpacity, setPinned],
  )
  const theme = useTheme(propsTheme)
  const themed = useThemeCraft(theme, 'tvFloatingPanel', craft)

  return (
    <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
      <FloatingPanelAppearanceContext.Provider value={appearance}>
        <ArkFloatingPanel.Root
          draggable={!pinned && draggable}
          {...props}
        >
          {children}
        </ArkFloatingPanel.Root>
      </FloatingPanelAppearanceContext.Provider>
    </ProvideComponentTheme>
  )
}

FloatingPanelRoot.displayName = 'FloatingPanel'
