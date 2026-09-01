import type { CheckboxGroupBaseProps } from '@ark-ui/react/checkbox'
import type { ForwardedRef, ReactElement } from 'react'
import type { CheckboxGroupProps, CheckboxValueType } from './props'
import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'
import { forwardRef } from 'react'

function CheckboxGroupInner<T extends CheckboxValueType>(
  { className, theme: _theme, children, ...props }: CheckboxGroupProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <ArkCheckbox.Group
      ref={ref}
      className={className}
      {...(props as CheckboxGroupBaseProps)}
    >
      {children}
    </ArkCheckbox.Group>
  )
}

export const CheckboxGroup = forwardRef(CheckboxGroupInner) as <
  T extends CheckboxValueType = CheckboxValueType,
>(
  props: CheckboxGroupProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => ReactElement | null

Object.assign(CheckboxGroup, { displayName: 'Checkbox.Group' })
