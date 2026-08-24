import type { MenuCheckboxItemProps } from './props'
import { Menu as ArkMenu, useMenuItemContext } from '@ark-ui/react/menu'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { Check } from 'lucide-react'
import { forwardRef } from 'react'

function DefaultCheckboxIndicator({ checkboxClassName }: { checkboxClassName?: string }) {
  const context = useMenuItemContext()
  const theme = useInheritedTheme()
  const checkboxCrafts = useCraft(theme, 'tvCheckbox')

  return (
    <span
      className={checkboxCrafts.control(cxc(checkboxClassName))}
      data-state={context.checked ? 'checked' : 'unchecked'}
      data-disabled={context.disabled ? '' : undefined}
      aria-hidden="true"
    >
      <ArkMenu.ItemIndicator className={checkboxCrafts.indicator()}>
        <Check className={checkboxCrafts.indicatorChecked()} />
      </ArkMenu.ItemIndicator>
    </span>
  )
}

export const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  ({ className, theme: propsTheme, ui, indicator, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvMenu')

    return (
      <ArkMenu.CheckboxItem
        ref={ref}
        className={crafts.item(cxc(ui?.root, className))}
        {...props}
      >
        {indicator ?? <DefaultCheckboxIndicator checkboxClassName={ui?.checkbox} />}
        {children}
      </ArkMenu.CheckboxItem>
    )
  },
)

MenuCheckboxItem.displayName = 'Menu.CheckboxItem'
