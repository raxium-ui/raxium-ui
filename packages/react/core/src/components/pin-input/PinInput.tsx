import type { ReactNode } from 'react'
import type { PinInputProps } from './props'
import { PinInput as ArkPinInput } from '@ark-ui/react/pin-input'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, Fragment } from 'react'

function gapAt(separator: PinInputProps['separator'], index: number): ReactNode {
  if (separator == null || index <= 0)
    return null
  if (Array.isArray(separator))
    return separator[index - 1]
  return separator
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      ui,
      count = 4,
      separator,
      size,
      label,
      prefix,
      suffix,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvPinInput', craft)
    const crafts = useCraft(themed, 'tvPinInput', size != null ? { size } : undefined)
    const cells = Array.from({ length: count }, (_, index) => index)
    const showLabel = label != null && label !== ''

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkPinInput.Root
          ref={ref}
          className={crafts.root(cxc(ui?.root, className))}
          count={count}
          {...props}
        >
          {showLabel && (
            <ArkPinInput.Label className={crafts.label(cxc(ui?.label))}>
              {label}
            </ArkPinInput.Label>
          )}
          <ArkPinInput.Control className={crafts.control(cxc(ui?.control))}>
            {prefix}
            {cells.map((index) => {
              const gap = gapAt(separator, index)
              return (
                <Fragment key={index}>
                  {gap != null && gap !== false && gap !== '' && (
                    <span
                      className={crafts.separator(cxc(ui?.separator))}
                      aria-hidden="true"
                    >
                      {gap}
                    </span>
                  )}
                  <ArkPinInput.Input
                    className={crafts.input(cxc(ui?.input))}
                    index={index}
                  />
                </Fragment>
              )
            })}
            {suffix}
          </ArkPinInput.Control>
          <ArkPinInput.HiddenInput />
        </ArkPinInput.Root>
      </ProvideComponentTheme>
    )
  },
)

PinInput.displayName = 'PinInput'
