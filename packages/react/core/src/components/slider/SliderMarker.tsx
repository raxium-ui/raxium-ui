import type { CSSProperties, PointerEvent } from 'react'
import type { SliderMarkerProps } from './props'
import { Slider as ArkSlider, useSliderContext } from '@ark-ui/react/slider'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>(
  (
    {
      className,
      theme: propsTheme,
      ui,
      value,
      index = 0,
      interactive = false,
      children,
      ...props
    },
    ref,
  ) => {
    const context = useSliderContext()
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSlider')
    const markerState = (context.getMarkerProps({ value }) as { 'data-state'?: string })['data-state']
    const markerValueStyle: CSSProperties | undefined = interactive
      ? { pointerEvents: 'auto' }
      : undefined

    function handleMarkerPointerDown(event: PointerEvent<HTMLElement>) {
      if (!interactive)
        return
      if (event.button !== 0)
        return
      event.stopPropagation()
      context.setThumbValue(index, value)
    }

    return (
      <ArkSlider.Marker
        ref={ref}
        value={value}
        className={crafts.marker(cxc(ui?.root, className))}
        {...props}
      >
        {children ?? (
          <>
            <div
              className={crafts.markerDot(cxc(ui?.dot))}
              data-scope="slider"
              data-part="marker-dot"
              data-state={markerState}
              onPointerDown={handleMarkerPointerDown}
            />
            <span
              className={crafts.markerValue(cxc(ui?.value))}
              style={markerValueStyle}
              data-state={markerState}
              onPointerDown={handleMarkerPointerDown}
            >
              {value}
            </span>
          </>
        )}
      </ArkSlider.Marker>
    )
  },
)

SliderMarker.displayName = 'Slider.Marker'
