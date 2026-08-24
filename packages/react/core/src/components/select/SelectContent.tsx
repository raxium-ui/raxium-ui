import type { CSSProperties } from 'react'
import type { SelectContentProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { Select as ArkSelect } from '@ark-ui/react/select'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTeleportedDepthOwner } from '@raxium/react/hooks/useDepth'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTeleportDetection } from '@raxium/react/hooks/useTeleportDetection'
import { useThemeAttrs } from '@raxium/react/hooks/useThemeAttrs'
import { cn, cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, theme: propsTheme, ui, children, ...props }, ref) => {
    const { isTeleported, setElementRef } = useTeleportDetection()
    const depth = useTeleportedDepthOwner({
      type: 'menu',
      active: isTeleported,
      fallbackZIndex: 'var(--z-dropdown, var(--z-index))',
    })
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSelect')
    const themeAttrs = useThemeAttrs(theme)

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <ArkSelect.Positioner
          ref={setElementRef}
          className={cn(ui?.positioner)}
          style={{ '--rui-z-index': isTeleported ? depth.zIndex : 'auto' } as CSSProperties}
        >
          <ArkSelect.Content
            ref={ref}
            className={crafts.content(cxc(ui?.root, className))}
            {...props}
            {...themeAttrs}
          >
            <ark.div
              data-scope="select"
              data-part="content-inner"
              className={crafts.contentInner(cxc(ui?.inner))}
              {...themeAttrs}
            >
              {children}
            </ark.div>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </ProvideStructuralComponentTheme>
    )
  },
)

SelectContent.displayName = 'Select.Content'
