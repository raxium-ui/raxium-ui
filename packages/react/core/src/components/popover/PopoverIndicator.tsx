import type { PopoverIndicatorProps } from './props'
import { PopoverIndicator as ArkPopoverIndicator } from '@ark-ui/react/popover'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { ChevronDown } from 'lucide-react'

export function PopoverIndicator({
  className,
  theme: propsTheme,
  asChild = true,
  children,
}: PopoverIndicatorProps) {
  const theme = useInheritedTheme(propsTheme)
  const crafts = useCraft(theme, 'tvPopover')

  return (
    <ArkPopoverIndicator asChild={asChild} className={crafts.indicator(cxc(className))}>
      {children ?? <ChevronDown />}
    </ArkPopoverIndicator>
  )
}

PopoverIndicator.displayName = 'Popover.Indicator'
