import type { DialogCloseTriggerProps } from './props'
import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { forwardRef } from 'react'
import { TriggerFrom, useDialogInterceptContext } from './dialog-intercept-context'

export const DialogCloseTrigger = forwardRef<HTMLButtonElement, DialogCloseTriggerProps>(
  ({ from = TriggerFrom.CLOSE_TRIGGER, onClick, children, ...props }, ref) => {
    const { setTriggerFrom } = useDialogInterceptContext()

    return (
      <ArkDialog.CloseTrigger
        ref={ref}
        onClick={(event) => {
          setTriggerFrom(from)
          onClick?.(event)
        }}
        {...props}
      >
        {children}
      </ArkDialog.CloseTrigger>
    )
  },
)

DialogCloseTrigger.displayName = 'Dialog.CloseTrigger'
