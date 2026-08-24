import type { MenuItemGroupProps } from './props'
import { Menu as ArkMenu } from '@ark-ui/react/menu'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const MenuItemGroup = forwardRef<HTMLDivElement, MenuItemGroupProps>(
  ({ className, theme: propsTheme, label, ui, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvMenu')
    const showLabel = label != null && label !== ''

    return (
      <ArkMenu.ItemGroup
        ref={ref}
        className={crafts.itemGroup(cxc(ui?.root, className))}
        {...props}
      >
        {showLabel && (
          <ArkMenu.ItemGroupLabel className={crafts.itemGroupLabel(cxc(ui?.label))}>
            {label}
          </ArkMenu.ItemGroupLabel>
        )}
        {children}
      </ArkMenu.ItemGroup>
    )
  },
)

MenuItemGroup.displayName = 'Menu.ItemGroup'
