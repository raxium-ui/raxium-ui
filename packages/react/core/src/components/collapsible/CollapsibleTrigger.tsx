import type { CollapsibleTriggerProps } from './props'
import { Collapsible as ArkCollapsible } from '@ark-ui/react/collapsible'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({
    className,
    theme: propsTheme,
    indicator = true,
    ui,
    children,
    ...props
  }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvCollapsible')

    return (
      <ArkCollapsible.Trigger
        ref={ref}
        className={crafts.trigger(cxc(ui?.root, className))}
        {...props}
      >
        {children}
        {indicator !== false && (
          <ArkCollapsible.Indicator className={crafts.indicator(cxc(ui?.indicator))}>
            {indicator === true ? <ChevronDown /> : indicator}
          </ArkCollapsible.Indicator>
        )}
      </ArkCollapsible.Trigger>
    )
  },
)

CollapsibleTrigger.displayName = 'Collapsible.Trigger'
