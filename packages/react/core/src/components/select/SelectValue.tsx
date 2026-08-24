import type { SelectValueProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { Select as ArkSelect } from '@ark-ui/react/select'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, theme: propsTheme, asChild, placeholder, children }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSelect')

    return (
      <ark.span
        ref={ref}
        className={crafts.value(cxc(className))}
        asChild={asChild}
      >
        {children ?? <ArkSelect.ValueText placeholder={placeholder} />}
      </ark.span>
    )
  },
)

SelectValue.displayName = 'Select.Value'
