import type { SelectItemProps } from './props'
import { Select as ArkSelect } from '@ark-ui/react/select'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { Check } from 'lucide-react'
import { forwardRef } from 'react'

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, theme: propsTheme, indicator, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSelect')

    return (
      <ArkSelect.Item
        ref={ref}
        className={crafts.item(cxc(className))}
        {...props}
      >
        <ArkSelect.ItemText>
          {children}
        </ArkSelect.ItemText>
        {indicator ?? (
          <ArkSelect.ItemIndicator className={crafts.itemIndicator()}>
            <Check />
          </ArkSelect.ItemIndicator>
        )}
      </ArkSelect.Item>
    )
  },
)

SelectItem.displayName = 'Select.Item'
