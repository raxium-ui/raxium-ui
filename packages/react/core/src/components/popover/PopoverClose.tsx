import type { PopoverCloseProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { PopoverCloseTrigger } from '@ark-ui/react/popover'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { useThemeAttrs } from '@raxium/react/hooks/useThemeAttrs'
import { cxc } from '@raxium/themes/utils'
import { X } from 'lucide-react'

export function PopoverClose({
  className,
  theme: propsTheme,
  asChild,
  children,
}: PopoverCloseProps) {
  const theme = useInheritedTheme(propsTheme)
  const crafts = useCraft(theme, 'tvPopover')
  const themeAttrs = useThemeAttrs(theme)

  return (
    <PopoverCloseTrigger asChild>
      {children ?? (
        <ark.button
          className={crafts.close(cxc(className))}
          asChild={asChild}
          {...themeAttrs}
        >
          <X />
        </ark.button>
      )}
    </PopoverCloseTrigger>
  )
}

PopoverClose.displayName = 'Popover.Close'
