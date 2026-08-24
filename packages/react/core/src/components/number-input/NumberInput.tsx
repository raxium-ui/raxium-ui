import type { NumberInputProps } from './props'
import { NumberInput as ArkNumberInput } from '@ark-ui/react/number-input'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { forwardRef } from 'react'

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      ui,
      showTrigger = false,
      prefix,
      suffix,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvNumberInput', craft)
    const crafts = useCraft(themed, 'tvNumberInput')
    const inputCrafts = useCraft(themed, 'tvInput')

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkNumberInput.Root
          className={crafts.root(cxc(ui?.root, className))}
          {...props}
        >
          {prefix}
          <ArkNumberInput.Control className={inputCrafts.root(cxc(crafts.control(), ui?.control))}>
            <ArkNumberInput.Input
              ref={ref}
              className={inputCrafts.input(cxc(crafts.input(), ui?.input))}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {showTrigger && (
              <div
                className={crafts.triggerGroup(cxc(ui?.triggerGroup))}
                data-scope="number-input"
                data-part="trigger-group"
              >
                <ArkNumberInput.IncrementTrigger className={crafts.trigger(cxc(ui?.trigger))}>
                  <ChevronUp />
                </ArkNumberInput.IncrementTrigger>
                <ArkNumberInput.DecrementTrigger className={crafts.trigger(cxc(ui?.trigger))}>
                  <ChevronDown />
                </ArkNumberInput.DecrementTrigger>
              </div>
            )}
          </ArkNumberInput.Control>
          {suffix}
        </ArkNumberInput.Root>
      </ProvideComponentTheme>
    )
  },
)

NumberInput.displayName = 'NumberInput'
