import type { HoverCardProps } from './props'
import { HoverCard as ArkHoverCard } from '@ark-ui/react/hover-card'
import { useConfig } from '@raxium/react/hooks/useConfig'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { defaults } from 'es-toolkit/compat'
import { useMemo } from 'react'

export function HoverCardRoot({
  theme: propsTheme,
  craft,
  lazyMount,
  unmountOnExit,
  openDelay,
  closeDelay,
  positioning,
  children,
  ...props
}: HoverCardProps) {
  const hoverCardConfig = useConfig('hover-card', { lazyMount, unmountOnExit, openDelay, closeDelay })
  const mergedPositioning = useMemo(
    () => defaults({ ...(positioning ?? {}) }, { placement: hoverCardConfig?.placement }),
    [hoverCardConfig?.placement, positioning],
  )
  const theme = useTheme(propsTheme, hoverCardConfig?.theme)
  const themed = useThemeCraft(theme, 'tvHoverCard', craft)

  return (
    <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
      <ArkHoverCard.Root
        lazyMount={hoverCardConfig?.lazyMount}
        unmountOnExit={hoverCardConfig?.unmountOnExit}
        openDelay={hoverCardConfig?.openDelay}
        closeDelay={hoverCardConfig?.closeDelay}
        positioning={mergedPositioning}
        {...props}
      >
        {children}
      </ArkHoverCard.Root>
    </ProvideComponentTheme>
  )
}

HoverCardRoot.displayName = 'HoverCard'
