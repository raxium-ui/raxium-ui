import type { SelectTriggerProps } from './props'
import { Select as ArkSelect } from '@ark-ui/react/select'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { ChevronDown, CircleX } from 'lucide-react'
import { forwardRef } from 'react'

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      className,
      theme: propsTheme,
      clearable,
      clearIcon,
      indicator,
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSelect')

    return (
      <ArkSelect.Control>
        <ArkSelect.Trigger
          ref={ref}
          className={crafts.trigger(cxc(className))}
          {...props}
        >
          {children}
          {clearable && (
            <ArkSelect.ClearTrigger className={crafts.clearTrigger()}>
              {clearIcon ?? <CircleX />}
            </ArkSelect.ClearTrigger>
          )}
          <ArkSelect.Indicator className={crafts.indicator()}>
            {indicator ?? <ChevronDown />}
          </ArkSelect.Indicator>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
    )
  },
)

SelectTrigger.displayName = 'Select.Trigger'
