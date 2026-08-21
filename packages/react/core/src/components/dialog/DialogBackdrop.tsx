import type { DialogBackdropProps } from './props'
import { useDialogContext } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import { usePresenceContext } from '@ark-ui/react/presence'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const dialog = useDialogContext()
    const presence = usePresenceContext()
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvDialog')

    if (presence.unmounted)
      return null

    return (
      <ark.div
        ref={ref}
        {...dialog.getBackdropProps()}
        {...presence.getPresenceProps()}
        className={crafts.backdrop(cxc(className))}
        {...props}
      >
        {children}
      </ark.div>
    )
  },
)

DialogBackdrop.displayName = 'Dialog.Backdrop'
