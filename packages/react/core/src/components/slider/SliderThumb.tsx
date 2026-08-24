import type { SliderThumbProps } from './props'
import { Slider as ArkSlider } from '@ark-ui/react/slider'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(
  ({ className, theme: propsTheme, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSlider')

    return (
      <ArkSlider.Thumb
        ref={ref}
        className={crafts.thumb(cxc(className))}
        data-theme-size={theme.size}
        {...props}
      >
        <ArkSlider.HiddenInput />
      </ArkSlider.Thumb>
    )
  },
)

SliderThumb.displayName = 'Slider.Thumb'
