import type { RadioGroupProps } from './props'
import { RadioGroup as ArkRadioGroup } from '@ark-ui/react/radio-group'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, theme: propsTheme, craft, ui, label, children, ...props }, ref) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvRadioGroup', craft)
    const crafts = useCraft(themed, 'tvRadioGroup')
    const showLabel = label != null && label !== ''

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkRadioGroup.Root
          ref={ref}
          className={crafts.root(cxc(ui?.root, className))}
          {...props}
        >
          {showLabel && (
            <ArkRadioGroup.Label className={crafts.label(cxc(ui?.label))}>
              {label}
            </ArkRadioGroup.Label>
          )}
          {children}
        </ArkRadioGroup.Root>
      </ProvideComponentTheme>
    )
  },
)

RadioGroupRoot.displayName = 'RadioGroup'
