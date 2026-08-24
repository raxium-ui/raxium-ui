import type { ProgressLinearProps } from './props'
import { Progress as ArkProgress, useProgressContext } from '@ark-ui/react/progress'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useRef } from 'react'
import { useRangeTransfer } from './useRangeTransfer'

export const ProgressLinear = forwardRef<HTMLDivElement, ProgressLinearProps>(
  ({ className, theme: propsTheme, variant = 'default', ui, ...props }, ref) => {
    const context = useProgressContext()
    const rangeRef = useRef<HTMLDivElement>(null)
    const transferStyles = useRangeTransfer(rangeRef, variant, 'background')
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvProgress', {
      orientation: (context.getTrackProps() as { 'data-orientation'?: string })['data-orientation'] ?? 'horizontal',
      variant,
    })

    return (
      <ArkProgress.Track
        ref={ref}
        className={crafts.track(cxc(ui?.track, className))}
        data-variant={variant}
        {...props}
      >
        <ArkProgress.Range
          ref={rangeRef}
          className={crafts.range(cxc(ui?.range))}
          data-variant={variant}
          style={transferStyles}
        />
      </ArkProgress.Track>
    )
  },
)

ProgressLinear.displayName = 'Progress.Linear'
