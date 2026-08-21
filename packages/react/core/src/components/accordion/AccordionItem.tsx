import type { AccordionItemProps } from './props'
import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvAccordion')

    return (
      <ArkAccordion.Item
        ref={ref}
        className={crafts.item(cxc(className))}
        {...props}
      >
        {children}
      </ArkAccordion.Item>
    )
  },
)

AccordionItem.displayName = 'Accordion.Item'
