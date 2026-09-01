import type { RadioGroupItemBaseProps } from '@ark-ui/react/radio-group'
import type { RadioGroupItemProps } from './props'
import { RadioGroup as ArkRadioGroup, useRadioGroupItemContext } from '@ark-ui/react/radio-group'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { Check, Circle } from 'lucide-react'
import { forwardRef } from 'react'

function DefaultIndicator({
  variant,
  className,
}: {
  variant: NonNullable<RadioGroupItemProps['variant']>
  className?: string
}) {
  const context = useRadioGroupItemContext()
  const hidden = context.checked ? undefined : true
  const state = context.checked ? 'checked' : 'unchecked'
  const iconProps = {
    className,
    'data-state': state,
    'data-variant': variant,
    hidden,
  }

  switch (variant) {
    case 'checkbox':
      return <Check {...iconProps} />
    case 'default':
      return <Circle {...iconProps} />
    default: {
      const _exhaustive: never = variant
      return _exhaustive
    }
  }
}

export const RadioGroupItem = forwardRef<HTMLLabelElement, RadioGroupItemProps>(
  (
    {
      className,
      theme: propsTheme,
      ui,
      text,
      variant = 'default',
      indicator,
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvRadioGroup', { variant })

    return (
      <ArkRadioGroup.Item
        ref={ref}
        className={crafts.item(cxc(ui?.root, className))}
        {...(props as RadioGroupItemBaseProps)}
      >
        <ArkRadioGroup.ItemControl
          className={crafts.itemControl(cxc(ui?.control))}
          data-variant={variant}
        >
          {indicator ?? (
            <DefaultIndicator
              variant={variant}
              className={crafts.itemIndicator(cxc(ui?.indicator))}
            />
          )}
        </ArkRadioGroup.ItemControl>
        {children ?? (
          text != null && text !== ''
            ? (
                <ArkRadioGroup.ItemText className={crafts.itemText(cxc(ui?.text))}>
                  {text}
                </ArkRadioGroup.ItemText>
              )
            : null
        )}
        <ArkRadioGroup.ItemHiddenInput />
      </ArkRadioGroup.Item>
    )
  },
)

RadioGroupItem.displayName = 'RadioGroup.Item'
