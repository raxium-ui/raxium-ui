import type { SliderTooltipThumbProps } from './props'
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

export const SliderTooltipThumb = forwardRef<HTMLDivElement, SliderTooltipThumbProps>(
  (
    {
      className,
      theme: propsTheme,
      index,
      name,
      open,
      widget,
      children,
      positioning,
      ...tooltipProps
    },
    ref,
  ) => {
    const context = useSliderContext()
    const boundary = useSliderBoundary()
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSlider')
    const tooltipOpen = open?.(context) ?? context.dragging
    const mergedPositioning = useMemo(
      () =>
        merge(
          {
            boundary: () => boundary,
            overflowPadding: 0,
            placement: 'top',
            flip: false,
            shift: true,
            slide: true,
            overlap: false,
          },
          positioning,
        ),
      [boundary, positioning],
    )

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <Tooltip
          open={tooltipOpen}
          positioning={mergedPositioning}
          theme={propsTheme}
          {...tooltipProps}
        >
          <SliderTooltipReposition valueKey={String(context.value)} />
          <Tooltip.Trigger asChild>
            <ArkSlider.Thumb
              ref={ref}
              className={crafts.thumb(cxc(className))}
              data-theme-size={theme.size}
              index={index}
              name={name}
            >
              <ArkSlider.HiddenInput />
            </ArkSlider.Thumb>
          </Tooltip.Trigger>
          <Tooltip.Content {...widget?.tooltipContent}>
            <Tooltip.Arrow {...widget?.tooltipArrow} />
            {children ?? <ArkSlider.ValueText />}
          </Tooltip.Content>
        </Tooltip>
      </ProvideStructuralComponentTheme>
    )
  },
)

SliderTooltipThumb.displayName = 'Slider.TooltipThumb'
