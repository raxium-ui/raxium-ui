import type { MouseEvent } from 'react'
import type { SliderTooltipMarkerProps } from './props'
import { Slider as ArkSlider, useSliderContext } from '@ark-ui/react/slider'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { cxc } from '@raxium/themes/utils'
import { merge } from 'es-toolkit/compat'
import { forwardRef, useMemo } from 'react'
import { Tooltip } from '../tooltip'
import { useSliderBoundary } from './slider-boundary-context'
import { SliderTooltipReposition } from './SliderTooltipReposition'

export const SliderTooltipMarker = forwardRef<HTMLSpanElement, SliderTooltipMarkerProps>(
  (
    {
      theme: propsTheme,
      value,
      index = 0,
      open: _open,
      className,
      ui,
      widget,
      interactive,
      content,
      children,
      positioning,
      onTooltipClick,
      ...tooltipProps
    },
    ref,
  ) => {
    const context = useSliderContext()
    const boundary = useSliderBoundary()
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSlider')
    const markerState = (context.getMarkerProps({ value }) as { 'data-state'?: string })['data-state']
    const mergedPositioning = useMemo(
      () =>
        merge(
          {
            boundary: () => boundary,
            overflowPadding: 0,
            placement: 'bottom',
            flip: false,
            shift: true,
            slide: true,
            overlap: false,
          },
          positioning,
        ),
      [boundary, positioning],
    )

    function handleTooltipContentClick(event: MouseEvent<HTMLDivElement>) {
      onTooltipClick?.(event)
      if (interactive)
        context.setThumbValue(index, value)
    }

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <Tooltip
          open
          interactive={interactive}
          positioning={mergedPositioning}
          theme={propsTheme}
          {...tooltipProps}
        >
          <SliderTooltipReposition valueKey={`${value}`} />
          <Tooltip.Trigger asChild>
            <ArkSlider.Marker
              ref={ref}
              value={value}
              className={crafts.marker(cxc(ui?.root, className))}
            >
              {children ?? (
                <div
                  className={crafts.markerDot(cxc(ui?.dot))}
                  data-scope="slider"
                  data-part="marker-dot"
                  data-state={markerState}
                />
              )}
            </ArkSlider.Marker>
          </Tooltip.Trigger>
          <Tooltip.Content {...widget?.tooltipContent} onClick={handleTooltipContentClick}>
            <Tooltip.Arrow {...widget?.tooltipArrow} />
            {content ?? (
              <span
                className={crafts.markerValue(cxc(ui?.value))}
                data-state={markerState}
              >
                {value}
              </span>
            )}
          </Tooltip.Content>
        </Tooltip>
      </ProvideStructuralComponentTheme>
    )
  },
)

SliderTooltipMarker.displayName = 'Slider.TooltipMarker'
