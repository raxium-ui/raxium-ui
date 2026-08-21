import type { FloatingPanelStage } from '@ark-ui/react/floating-panel'
import type { ReactNode } from 'react'
import type { FloatingPanelStageTriggerProps } from './props'
import { FloatingPanel as ArkFloatingPanel } from '@ark-ui/react/floating-panel'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { Minus, Square, SquareArrowOutDownLeft } from 'lucide-react'
import { forwardRef } from 'react'

function stageIcon(stage: FloatingPanelStage): ReactNode {
  switch (stage) {
    case 'minimized':
      return <Minus />
    case 'maximized':
      return <Square />
    case 'default':
      return <SquareArrowOutDownLeft />
    default: {
      const _exhaustive: never = stage
      return _exhaustive
    }
  }
}

export const FloatingPanelStageTrigger = forwardRef<HTMLButtonElement, FloatingPanelStageTriggerProps>(
  ({ className, theme: propsTheme, stage, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvFloatingPanel')

    return (
      <ArkFloatingPanel.StageTrigger
        ref={ref}
        stage={stage}
        className={crafts.trigger(cxc(className))}
        {...props}
      >
        {children ?? stageIcon(stage)}
      </ArkFloatingPanel.StageTrigger>
    )
  },
)

FloatingPanelStageTrigger.displayName = 'FloatingPanel.StageTrigger'
