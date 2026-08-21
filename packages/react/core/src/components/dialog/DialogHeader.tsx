import type { DialogHeaderProps } from './props'
import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { useStableId } from '@raxium/react/hooks/useStableId'
import { cxc } from '@raxium/themes/utils'
import { X } from 'lucide-react'
import { forwardRef } from 'react'
import { DialogCloseTrigger } from './DialogCloseTrigger'

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, theme: propsTheme, ui, children }, ref) => {
    const id = useStableId('dialog-header')
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvDialog')

    return (
      <ark.div
        ref={ref}
        id={id}
        className={crafts.header(cxc(ui?.root, className))}
        data-scope="dialog"
        data-part="header"
      >
        <ArkDialog.Title className={crafts.title(cxc(ui?.title))}>
          {children}
        </ArkDialog.Title>
        <DialogCloseTrigger asChild>
          <ark.button className={crafts.close(cxc(ui?.close))}>
            <X />
            <span className="sr-only">Close</span>
          </ark.button>
        </DialogCloseTrigger>
      </ark.div>
    )
  },
)

DialogHeader.displayName = 'Dialog.Header'
