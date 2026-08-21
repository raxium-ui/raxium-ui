import type { AccordionTriggerProps } from './props'
import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({
    className,
    theme: propsTheme,
    indicator = true,
    ui,
    children,
    ...props
  }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvAccordion')

    return (
      <ArkAccordion.ItemTrigger
        ref={ref}
        className={crafts.trigger(cxc(ui?.root, className))}
        {...props}
      >
        {children}
        {indicator !== false && (
          <ArkAccordion.ItemIndicator className={crafts.indicator(cxc(ui?.indicator))}>
            {indicator === true ? <ChevronDown /> : indicator}
          </ArkAccordion.ItemIndicator>
        )}
      </ArkAccordion.ItemTrigger>
    )
  },
)

AccordionTrigger.displayName = 'Accordion.Trigger'
