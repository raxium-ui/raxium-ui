import type { CSSProperties } from 'react'
import type { ProgressCircleProps } from './props'
import { Progress as ArkProgress } from '@ark-ui/react/progress'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useRef } from 'react'
import { useRangeTransfer } from './useRangeTransfer'

export const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>(
  ({ className, theme: propsTheme, variant = 'default', ui, ...props }, ref) => {
    const rangeRef = useRef<SVGCircleElement>(null)
    const transferStyles = useRangeTransfer(rangeRef, variant, 'stroke')
    const theme = useInheritedTheme(
      propsTheme
        ? { ...propsTheme, size: typeof propsTheme.size === 'number' ? undefined : propsTheme.size }
        : undefined,
    )
    const size = propsTheme?.size ?? theme.size
    const crafts = useCraft(theme, 'tvProgress', {
      size: typeof size === 'string' ? size : 'base',
    })

    return (
      <ArkProgress.Circle
        ref={ref}
        className={crafts.circle(cxc(ui?.circle, className))}
        data-variant={variant}
        style={typeof size === 'number' ? { '--size': `${size}px` } as CSSProperties : undefined}
        {...props}
      >
        <ArkProgress.CircleTrack
          className={crafts.circleTrack(cxc(ui?.circleTrack))}
          data-variant={variant}
        />
        <ArkProgress.CircleRange
          ref={rangeRef}
          className={crafts.circleRange(cxc(ui?.circleRange))}
          data-variant={variant}
          style={transferStyles}
        />
      </ArkProgress.Circle>
    )
  },
)

ProgressCircle.displayName = 'Progress.Circle'
