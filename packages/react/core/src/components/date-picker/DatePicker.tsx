import type { DatePickerProps } from './props'
import { DatePicker as ArkDatePicker } from '@ark-ui/react/date-picker'
import { useConfig } from '@raxium/react/hooks/useConfig'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { defaults } from 'es-toolkit/compat'
import { forwardRef, useMemo } from 'react'

export const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      lazyMount,
      unmountOnExit,
      positioning,
      children,
      ...props
    },
    ref,
  ) => {
    const datePickerOptions = useConfig('date-picker', { lazyMount, unmountOnExit })
    const mergedPositioning = useMemo(
      () => defaults({ ...(positioning ?? {}) }, { placement: datePickerOptions?.placement }),
      [datePickerOptions?.placement, positioning],
    )
    const theme = useTheme(propsTheme, datePickerOptions?.theme)
    const themed = useThemeCraft(theme, 'tvDatePicker', craft)
    const crafts = useCraft(themed, 'tvDatePicker')

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkDatePicker.Root
          ref={ref}
          className={crafts.root(cxc(className))}
          lazyMount={datePickerOptions?.lazyMount}
          unmountOnExit={datePickerOptions?.unmountOnExit}
          positioning={mergedPositioning}
          {...props}
        >
          {children}
        </ArkDatePicker.Root>
      </ProvideComponentTheme>
    )
  },
)

DatePickerRoot.displayName = 'DatePicker'
