import type { MenuRadioItemGroupProps } from './props'
import { Menu as ArkMenu } from '@ark-ui/react/menu'
import { forwardRef } from 'react'

export const MenuRadioItemGroup = forwardRef<HTMLDivElement, MenuRadioItemGroupProps>(
  ({ className, theme: _theme, children, ...props }, ref) => {
    return (
      <ArkMenu.RadioItemGroup ref={ref} className={className} {...props}>
        {children}
      </ArkMenu.RadioItemGroup>
    )
  },
)

MenuRadioItemGroup.displayName = 'Menu.RadioItemGroup'
