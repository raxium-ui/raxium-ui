import type { ScrollAreaOverflow } from './overflow-context'
import type { ScrollAreaProps } from './props'
import { ScrollArea as ArkScrollArea } from '@ark-ui/react/scroll-area'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useMemo, useState } from 'react'
import { ScrollAreaOverflowContext } from './overflow-context'

export const ScrollAreaRoot = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, theme: propsTheme, craft, ui, children, ...props }, ref) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvScrollArea', craft)
    const crafts = useCraft(themed, 'tvScrollArea')
    const [overflow, setOverflow] = useState<ScrollAreaOverflow>({
      vertical: false,
      horizontal: false,
    })
    const overflowValue = useMemo(() => ({ overflow, setOverflow }), [overflow])

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ScrollAreaOverflowContext.Provider value={overflowValue}>
          <ArkScrollArea.Root
            ref={ref}
            className={crafts.root(cxc(ui?.root, className))}
            {...props}
          >
            {children}
          </ArkScrollArea.Root>
        </ScrollAreaOverflowContext.Provider>
      </ProvideComponentTheme>
    )
  },
)

ScrollAreaRoot.displayName = 'ScrollArea'
