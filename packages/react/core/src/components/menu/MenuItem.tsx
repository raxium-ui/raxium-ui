import type { MenuItemProps } from './props'
import { Menu as ArkMenu } from '@ark-ui/react/menu'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvMenu')

    return (
      <ArkMenu.Item
        ref={ref}
        className={crafts.item(cxc(className))}
        {...props}
      >
        {children}
      </ArkMenu.Item>
    )
  },
)

MenuItem.displayName = 'Menu.Item'
