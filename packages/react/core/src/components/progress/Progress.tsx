import type { ProgressProps } from './props'
import { Progress as ArkProgress } from '@ark-ui/react/progress'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, theme: propsTheme, craft, orientation = 'horizontal', children, ...props }, ref) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvProgress', craft)
    const crafts = useCraft(themed, 'tvProgress', { orientation })

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkProgress.Root
          ref={ref}
          className={crafts.root(cxc(className))}
          orientation={orientation}
          {...props}
        >
          {children}
        </ArkProgress.Root>
      </ProvideComponentTheme>
    )
  },
)

ProgressRoot.displayName = 'Progress'
