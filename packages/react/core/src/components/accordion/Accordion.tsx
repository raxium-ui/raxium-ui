import type { AccordionProps } from './props'
import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, theme: propsTheme, craft, children, ...props }, ref) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvAccordion', craft)
    const crafts = useCraft(themed, 'tvAccordion')

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkAccordion.Root
          ref={ref}
          className={crafts.root(cxc(className))}
          {...props}
        >
          {children}
        </ArkAccordion.Root>
      </ProvideComponentTheme>
    )
  },
)

AccordionRoot.displayName = 'Accordion'
