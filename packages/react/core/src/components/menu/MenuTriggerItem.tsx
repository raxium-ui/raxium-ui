import type { MenuTriggerItemProps } from './props'
import { Menu as ArkMenu } from '@ark-ui/react/menu'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cn, cxc } from '@raxium/themes/utils'
import { ChevronRight } from 'lucide-react'
import { forwardRef } from 'react'

export const MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvMenu')

    return (
      <ArkMenu.TriggerItem
        ref={ref}
        className={cn(crafts.item(cxc(className)), crafts.triggerItem())}
        {...props}
      >
        <ArkMenu.ItemText>
          {children}
        </ArkMenu.ItemText>
        <ArkMenu.Indicator className={crafts.triggerItemIndicator()}>
          <ChevronRight />
        </ArkMenu.Indicator>
      </ArkMenu.TriggerItem>
    )
  },
)

MenuTriggerItem.displayName = 'Menu.TriggerItem'
