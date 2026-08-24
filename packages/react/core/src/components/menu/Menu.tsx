import type { MenuProps } from './props'
import { Menu as ArkMenu } from '@ark-ui/react/menu'
import { useConfig } from '@raxium/react/hooks/useConfig'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { defaults } from 'es-toolkit/compat'
import { useMemo } from 'react'

export function MenuRoot({
  className: _className,
  theme: propsTheme,
  craft,
  lazyMount,
  unmountOnExit,
  positioning,
  children,
  ...props
}: MenuProps) {
  const menuConfig = useConfig('menu', { lazyMount, unmountOnExit })
  const mergedPositioning = useMemo(
    () => defaults({ ...(positioning ?? {}) }, { placement: menuConfig?.placement }),
    [positioning, menuConfig?.placement],
  )
  const theme = useTheme(propsTheme, menuConfig?.theme)
  const themed = useThemeCraft(theme, 'tvMenu', craft)

  return (
    <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
      <ArkMenu.Root
        lazyMount={menuConfig?.lazyMount}
        unmountOnExit={menuConfig?.unmountOnExit}
        positioning={mergedPositioning}
        {...props}
      >
        {children}
      </ArkMenu.Root>
    </ProvideComponentTheme>
  )
}

MenuRoot.displayName = 'Menu'
