import type { CSSProperties } from 'react'
import type { DialogContentProps } from './props'
import { Dialog as ArkDialog, useDialogContext } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import { DepthOwnerProvider, useDepthOwner } from '@raxium/react/hooks/useDepth'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useThemeAttrs } from '@raxium/react/hooks/useThemeAttrs'
import { cn, cxc } from '@raxium/themes/utils'
import { X } from 'lucide-react'
import { forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { DialogBackdrop } from './DialogBackdrop'
import { DialogCloseTrigger } from './DialogCloseTrigger'
import { hasDialogHeader } from './has-dialog-header'

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, theme: propsTheme, ui, showClose = true, close, children, ...props }, ref) => {
    const dialog = useDialogContext()
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvDialog')
    const themeAttrs = useThemeAttrs(theme)
    const depthOwner = useDepthOwner('dialog', { active: dialog.open })
    const showContentClose = showClose && !hasDialogHeader(children)
    const defaultClose = (
      <DialogCloseTrigger asChild>
        <ark.button
          className={cn(['absolute', 'top-0', 'right-0'], crafts.close(cxc(ui?.close)))}
          data-variant="content-close"
        >
          <X />
          <span className="sr-only">Close</span>
        </ark.button>
      </DialogCloseTrigger>
    )

    if (typeof document === 'undefined')
      return null

    return createPortal(
      <ProvideStructuralComponentTheme theme={theme}>
        <DepthOwnerProvider owner={depthOwner}>
          <DialogBackdrop
            {...themeAttrs}
            className={crafts.backdrop(cxc(ui?.backdrop))}
            theme={theme}
            style={{ '--rui-z-index': depthOwner.backdropZIndex } as CSSProperties}
          />
          <ArkDialog.Positioner
            {...themeAttrs}
            className={crafts.positioner(cxc(ui?.positioner))}
            style={{ '--rui-z-index': depthOwner.contentZIndex } as CSSProperties}
          >
            <ArkDialog.Content
              ref={ref}
              {...themeAttrs}
              className={crafts.content(cxc(ui?.content, className))}
              {...props}
            >
              {children}
              {close ?? (showContentClose ? defaultClose : null)}
            </ArkDialog.Content>
          </ArkDialog.Positioner>
        </DepthOwnerProvider>
      </ProvideStructuralComponentTheme>,
      document.body,
    )
  },
)

DialogContent.displayName = 'Dialog.Content'
