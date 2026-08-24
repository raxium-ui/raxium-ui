import type { ScrollAreaCornerProps } from './props'
import { ScrollArea as ArkScrollArea } from '@ark-ui/react/scroll-area'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const ScrollAreaCorner = forwardRef<HTMLDivElement, ScrollAreaCornerProps>(
  ({ className, theme: propsTheme, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvScrollArea')

    return (
      <ArkScrollArea.Corner
        ref={ref}
        className={crafts.corner(cxc(className))}
        {...props}
      />
    )
  },
)

ScrollAreaCorner.displayName = 'ScrollArea.Corner'
