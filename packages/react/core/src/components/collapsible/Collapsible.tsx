import type { CollapsibleProps } from './props'
import { Collapsible as ArkCollapsible } from '@ark-ui/react/collapsible'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, theme: propsTheme, craft, children, ...props }, ref) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvCollapsible', craft)
    const crafts = useCraft(themed, 'tvCollapsible')

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkCollapsible.Root
          ref={ref}
          className={crafts.root(cxc(className))}
          {...props}
        >
          {children}
        </ArkCollapsible.Root>
      </ProvideComponentTheme>
    )
  },
)

CollapsibleRoot.displayName = 'Collapsible'
