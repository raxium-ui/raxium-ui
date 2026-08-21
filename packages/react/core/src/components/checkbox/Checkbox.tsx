import type { ReactNode } from 'react'
import type { CheckboxProps } from './props'
import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { cxc } from '@raxium/themes/utils'
import { Check, Minus } from 'lucide-react'
import { cloneElement, forwardRef, isValidElement, useMemo } from 'react'

function renderIndicator(indicator: ReactNode | undefined, fallback: ReactNode) {
  if (indicator == null)
    return fallback
  if (isValidElement(indicator))
    return cloneElement(indicator)
  return indicator
}

export const CheckboxRoot = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      label,
      ui,
      indicator,
      disabled,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const variants = useMemo(() => ({ disabled }), [disabled])
    const crafts = useCraft(theme, 'tvCheckbox', variants, craft)
    const showLabel = label != null && label !== ''

    return (
      <ArkCheckbox.Root
        ref={ref}
        className={crafts.root(cxc(ui?.root, className))}
        disabled={disabled}
        {...props}
      >
        <ArkCheckbox.Control className={crafts.control(cxc(ui?.control))}>
          <ArkCheckbox.Indicator className={crafts.indicator(cxc(ui?.indicator))}>
            {renderIndicator(indicator, <Check className={crafts.indicatorChecked()} />)}
          </ArkCheckbox.Indicator>
          <ArkCheckbox.Indicator className={crafts.indicator(cxc(ui?.indicator))} indeterminate>
            {renderIndicator(indicator, <Minus className={crafts.indicatorMinus()} />)}
          </ArkCheckbox.Indicator>
        </ArkCheckbox.Control>
        {showLabel && (
          <ArkCheckbox.Label className={crafts.label(cxc(ui?.label))} asChild={typeof label === 'string'}>
            {typeof label === 'string' ? <span>{label}</span> : label}
          </ArkCheckbox.Label>
        )}
        <ArkCheckbox.HiddenInput />
      </ArkCheckbox.Root>
    )
  },
)

CheckboxRoot.displayName = 'Checkbox'
