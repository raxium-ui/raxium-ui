import type { SwitchProps } from './props'
import { Switch as ArkSwitch } from '@ark-ui/react/switch'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const SwitchRoot = forwardRef<HTMLLabelElement, SwitchProps>(
  ({ className, theme: propsTheme, craft, ui, children, ...props }, ref) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvSwitch', craft)
    const crafts = useCraft(themed, 'tvSwitch')

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkSwitch.Root
          ref={ref}
          className={crafts.root(cxc(ui?.root, className))}
          {...props}
        >
          <ArkSwitch.Control className={crafts.control(cxc(ui?.control))}>
            <ArkSwitch.Thumb className={crafts.thumb(cxc(ui?.thumb))} />
          </ArkSwitch.Control>
          {children}
          <ArkSwitch.HiddenInput />
        </ArkSwitch.Root>
      </ProvideComponentTheme>
    )
  },
)

SwitchRoot.displayName = 'Switch'
