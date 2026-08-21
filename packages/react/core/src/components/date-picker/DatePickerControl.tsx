import type { DatePickerControlProps } from './props'
import { DatePicker as ArkDatePicker } from '@ark-ui/react/date-picker'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const DatePickerControl = forwardRef<HTMLDivElement, DatePickerControlProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvDatePicker')

    return (
      <ArkDatePicker.Control
        ref={ref}
        className={crafts.control(cxc(className))}
        {...props}
      >
        {children}
      </ArkDatePicker.Control>
    )
  },
)

DatePickerControl.displayName = 'DatePicker.Control'
