import type { PopoverProps } from './props'
import { Popover as ArkPopover } from '@ark-ui/react/popover'
import { useConfig } from '@raxium/react/hooks/useConfig'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { defaults } from 'es-toolkit/compat'
import { useMemo } from 'react'

export function PopoverRoot({
  theme: propsTheme,
  craft,
  lazyMount,
  unmountOnExit,
  positioning,
  children,
  ...props
}: PopoverProps) {
  const popoverConfig = useConfig('popover', { lazyMount, unmountOnExit })
  const mergedPositioning = useMemo(
    () => defaults({ ...(positioning ?? {}) }, { placement: popoverConfig?.placement }),
    [popoverConfig?.placement, positioning],
  )
  const theme = useTheme(propsTheme, popoverConfig?.theme)
  const themed = useThemeCraft(theme, 'tvPopover', craft)

  return (
    <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
      <ArkPopover.Root
        lazyMount={popoverConfig?.lazyMount}
        unmountOnExit={popoverConfig?.unmountOnExit}
        positioning={mergedPositioning}
        {...props}
      >
        {children}
      </ArkPopover.Root>
    </ProvideComponentTheme>
  )
}

PopoverRoot.displayName = 'Popover'
