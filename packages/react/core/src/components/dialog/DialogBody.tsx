import type { DialogBodyProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { useStableId } from '@raxium/react/hooks/useStableId'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const id = useStableId('dialog-body')
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvDialog')

    return (
      <ark.div
        ref={ref}
        id={id}
        className={crafts.body(cxc(className))}
        data-scope="dialog"
        data-part="body"
        {...props}
      >
        {children}
      </ark.div>
    )
  },
)

DialogBody.displayName = 'Dialog.Body'
