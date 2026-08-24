import type { SliderProps } from './props'
import { Slider as ArkSlider } from '@ark-ui/react/slider'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useCallback, useMemo, useState } from 'react'
import { SliderBoundaryProvider } from './slider-boundary-context'

export const SliderRoot = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      ui,
      prefix,
      suffix,
      orientation = 'horizontal',
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvSlider', craft)
    const variants = useMemo(() => ({ orientation }), [orientation])
    const crafts = useCraft(themed, 'tvSlider', variants)
    const [controlEl, setControlEl] = useState<HTMLElement | undefined>()
    const setControlRef = useCallback((node: HTMLDivElement | null) => {
      setControlEl(node ?? undefined)
    }, [])

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkSlider.Root
          ref={ref}
          className={crafts.root(cxc(ui?.root, className))}
          orientation={orientation}
          {...props}
        >
          <SliderBoundaryProvider value={controlEl}>
            {prefix}
            <ArkSlider.Control ref={setControlRef} className={crafts.control(cxc(ui?.control))}>
              <ArkSlider.Track className={crafts.track(cxc(ui?.track))}>
                <ArkSlider.Range className={crafts.range(cxc(ui?.range))} />
              </ArkSlider.Track>
              {children}
            </ArkSlider.Control>
            {suffix}
          </SliderBoundaryProvider>
        </ArkSlider.Root>
      </ProvideComponentTheme>
    )
  },
)

SliderRoot.displayName = 'Slider'
