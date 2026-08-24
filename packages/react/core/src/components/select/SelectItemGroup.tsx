import type { SelectItemGroupProps } from './props'
import { Select as ArkSelect } from '@ark-ui/react/select'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const SelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>(
  ({ className, theme: propsTheme, label, ui, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSelect')

    return (
      <ArkSelect.ItemGroup
        ref={ref}
        className={crafts.itemGroup(cxc(ui?.root, className))}
        {...props}
      >
        {label != null && label !== '' && (
          <ArkSelect.ItemGroupLabel className={crafts.itemGroupLabel(cxc(ui?.label))}>
            {label}
          </ArkSelect.ItemGroupLabel>
        )}
        {children}
      </ArkSelect.ItemGroup>
    )
  },
)

SelectItemGroup.displayName = 'Select.ItemGroup'
