import type { CheckboxGroupProps } from './props'
import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'
import { forwardRef } from 'react'

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, theme: _theme, children, ...props }, ref) => {
    return (
      <ArkCheckbox.Group ref={ref} className={className} {...props}>
        {children}
      </ArkCheckbox.Group>
    )
  },
)

CheckboxGroup.displayName = 'Checkbox.Group'
