import type { CollapsibleContentProps } from './props'
import { Collapsible as ArkCollapsible } from '@ark-ui/react/collapsible'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvCollapsible')

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <ArkCollapsible.Content
          ref={ref}
          className={crafts.content(cxc(className))}
          {...props}
        >
          {children}
        </ArkCollapsible.Content>
      </ProvideStructuralComponentTheme>
    )
  },
)

CollapsibleContent.displayName = 'Collapsible.Content'
