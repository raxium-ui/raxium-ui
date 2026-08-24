import type { TooltipProps } from './props'
import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip'
import { useConfig } from '@raxium/react/hooks/useConfig'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { defaults } from 'es-toolkit/compat'
import { useMemo } from 'react'

export function TooltipRoot({
  theme: propsTheme,
  craft,
  lazyMount,
  unmountOnExit,
  openDelay,
  closeDelay,
  positioning,
  children,
  ...props
}: TooltipProps) {
  const tooltipConfig = useConfig('tooltip', { lazyMount, unmountOnExit, openDelay, closeDelay })
  const mergedPositioning = useMemo(
    () => defaults({ ...(positioning ?? {}) }, { placement: tooltipConfig?.placement }),
    [tooltipConfig?.placement, positioning],
  )
  const theme = useTheme(propsTheme, tooltipConfig?.theme)
  const themed = useThemeCraft(theme, 'tvTooltip', craft)

  return (
    <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
      <ArkTooltip.Root
        lazyMount={tooltipConfig?.lazyMount}
        unmountOnExit={tooltipConfig?.unmountOnExit}
        openDelay={tooltipConfig?.openDelay}
        closeDelay={tooltipConfig?.closeDelay}
        positioning={mergedPositioning}
        {...props}
      >
        {children}
      </ArkTooltip.Root>
    </ProvideComponentTheme>
  )
}

TooltipRoot.displayName = 'Tooltip'
