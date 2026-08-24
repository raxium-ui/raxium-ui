import {
  MenuContextTrigger,
  MenuItemText,
  MenuTrigger,
  useMenuContext,
  useMenuItemContext,
} from '@ark-ui/react/menu'
import { MenuRoot } from './Menu'
import { MenuArrow } from './MenuArrow'
import { MenuCheckboxItem } from './MenuCheckboxItem'
import { MenuContent } from './MenuContent'
import { MenuItem } from './MenuItem'
import { MenuItemGroup } from './MenuItemGroup'
import { MenuRadioItem } from './MenuRadioItem'
import { MenuRadioItemGroup } from './MenuRadioItemGroup'
import { MenuTriggerItem } from './MenuTriggerItem'

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  ContextTrigger: MenuContextTrigger,
  Content: MenuContent,
  Arrow: MenuArrow,
  Item: MenuItem,
  ItemText: MenuItemText,
  ItemGroup: MenuItemGroup,
  CheckboxItem: MenuCheckboxItem,
  RadioItem: MenuRadioItem,
  RadioItemGroup: MenuRadioItemGroup,
  TriggerItem: MenuTriggerItem,
})

export {
  MenuArrow,
  MenuCheckboxItem,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuItemGroup,
  MenuItemText,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuTrigger,
  MenuTriggerItem,
  useMenuContext,
  useMenuItemContext,
}

export type {
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuItemGroupProps,
  MenuItemProps,
  MenuProps,
  MenuRadioItemGroupProps,
  MenuRadioItemProps,
  MenuTriggerItemProps,
} from './props'
export type { ArrowProps as MenuArrowProps } from '../arrow/createArrow'
