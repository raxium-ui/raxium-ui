import { MenuArrow as ArkMenuArrow, MenuArrowTip } from '@ark-ui/react/menu'
import { createArrow } from '../arrow/createArrow'

export const MenuArrow = createArrow(ArkMenuArrow, MenuArrowTip)
MenuArrow.displayName = 'Menu.Arrow'
