import type { CSSProperties } from 'react'
import type { ProgressArcProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { Progress as ArkProgress, useProgressContext } from '@ark-ui/react/progress'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { getNodeCssVar } from '@raxium/shared/css'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useMemo, useRef } from 'react'
import { useRangeTransfer } from './useRangeTransfer'

export const ProgressArc = forwardRef<SVGSVGElement, ProgressArcProps>(
  ({ className, theme: propsTheme, theta = 60, ui, variant = 'default', ...props }, ref) => {
    const context = useProgressContext()
    const trackRef = useRef<SVGCircleElement>(null)
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

    const trackProps = { ...context.getCircleTrackProps() } as Record<string, unknown>
    const rangeProps = { ...context.getCircleRangeProps() } as Record<string, unknown>
    const trackStyle = { ...(trackProps.style as CSSProperties | undefined) }
    const rangeStyle = { ...(rangeProps.style as CSSProperties | undefined) }
    delete trackStyle.strokeDasharray
    delete trackStyle.strokeDashoffset
    delete rangeStyle.strokeDasharray
    delete rangeStyle.strokeDashoffset
    delete rangeStyle.transform
    delete rangeStyle.transformOrigin
    delete trackProps.style
    delete rangeProps.style

    const radius = Number.parseInt(
      getNodeCssVar(trackRef.current as HTMLElement | null, '--radius', '24px'),
      10,
    )
    const arc = useMemo(() => Math.ceil(((360 - theta) * Math.PI * radius) / 180), [radius, theta])
    const dashoffset = arc - ((context.percent ?? 0) / 100) * arc

    return (
      <ArkProgress.Circle
        ref={ref}
        className={crafts.circle(cxc(ui?.circle, className))}
        data-variant={variant}
        style={typeof size === 'number' ? { '--size': `${size}px` } as CSSProperties : undefined}
        {...props}
      >
        <g
          fill="none"
          style={{
            transformOrigin: 'center center',
            transform: `rotate(${90 + theta / 2}deg)`,
          }}
        >
          <ark.circle
            {...trackProps}
            ref={trackRef}
            className={crafts.circleTrack(cxc(ui?.circleTrack))}
            data-variant={variant}
            strokeDasharray={`${arc} 1000`}
            strokeDashoffset="0"
            style={trackStyle}
          />
          <ark.circle
            {...rangeProps}
            ref={rangeRef}
            className={crafts.circleRange(cxc(ui?.circleRange))}
            data-variant={variant}
            strokeDasharray={`${arc} 1000`}
            strokeDashoffset={dashoffset}
            style={{ ...rangeStyle, ...transferStyles }}
          />
        </g>
      </ArkProgress.Circle>
    )
  },
)

ProgressArc.displayName = 'Progress.Arc'
