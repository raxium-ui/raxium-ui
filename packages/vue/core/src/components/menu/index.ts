import {
  MenuArrow as ArkMenuArrow,
  MenuArrowTip as ArkMenuArrowTip,
  MenuContext,
  MenuContextTrigger,
  MenuItemIndicator,
  MenuItemText,
  MenuTrigger,
} from '@ark-ui/vue/menu'
import { withCompoundParts } from '../../utils/withCompoundParts'
import { createArrow } from '../arrow/createArrow'
import MenuRoot from './Menu.vue'
import MenuCheckboxItem from './MenuCheckboxItem.vue'
import MenuContent from './MenuContent.vue'
import MenuItem from './MenuItem.vue'
import MenuItemGroup from './MenuItemGroup.vue'
import MenuRadioItem from './MenuRadioItem.vue'
import MenuRadioItemGroup from './MenuRadioItemGroup.vue'
import MenuTriggerItem from './MenuTriggerItem.vue'

const MenuArrow = createArrow(ArkMenuArrow, ArkMenuArrowTip)

export const Menu = withCompoundParts(MenuRoot, {
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
  MenuContext,
  MenuContextTrigger,
  MenuItem,
  MenuItemGroup,
  MenuItemIndicator,
  MenuItemText,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuTrigger,
  MenuTriggerItem,
}
export * from './props'
