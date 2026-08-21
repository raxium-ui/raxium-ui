import type { CSSProperties } from 'react'
import type { DatePickerContentProps } from './props'
import { DatePicker as ArkDatePicker } from '@ark-ui/react/date-picker'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTeleportedDepthOwner } from '@raxium/react/hooks/useDepth'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTeleportDetection } from '@raxium/react/hooks/useTeleportDetection'
import { useComposedRefs } from '@raxium/react/utils'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useMemo } from 'react'
import { collectDatePickerViews } from './collect-views'
import { DatePickerContentContext } from './date-picker-content-context'

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  ({ className, theme: propsTheme, prefix, suffix, children, ...props }, ref) => {
    const { isTeleported, setElementRef } = useTeleportDetection()
    const depth = useTeleportedDepthOwner({
      type: 'popover',
      active: isTeleported,
      fallbackZIndex: 'var(--z-popover, var(--z-index))',
    })
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvDatePicker')
    const viewsState = useMemo(() => collectDatePickerViews(children), [children])
    const positionerRef = useComposedRefs(setElementRef, ref)

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <DatePickerContentContext.Provider value={viewsState}>
          <ArkDatePicker.Positioner
            ref={positionerRef}
            style={
              {
                '--rui-z-index': isTeleported ? depth.zIndex : 'auto',
              } as CSSProperties
            }
          >
            <ArkDatePicker.Content
              className={crafts.content(cxc(className))}
              {...props}
            >
              {prefix}
              <ark.div
                className={crafts.contentInner()}
                data-scope="date-picker"
                data-part="content-inner"
              >
                {children}
              </ark.div>
              {suffix}
            </ArkDatePicker.Content>
          </ArkDatePicker.Positioner>
        </DatePickerContentContext.Provider>
      </ProvideStructuralComponentTheme>
    )
  },
)

DatePickerContent.displayName = 'DatePicker.Content'
