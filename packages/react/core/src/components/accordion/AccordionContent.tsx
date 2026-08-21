import type { AccordionContentProps } from './props'
import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvAccordion')

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <ArkAccordion.ItemContent
          ref={ref}
          className={crafts.content(cxc(className))}
          {...props}
        >
          {children}
        </ArkAccordion.ItemContent>
      </ProvideStructuralComponentTheme>
    )
  },
)

AccordionContent.displayName = 'Accordion.Content'
