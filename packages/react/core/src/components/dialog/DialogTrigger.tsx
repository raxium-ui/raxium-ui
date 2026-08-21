import type { DialogTriggerProps } from './props'
import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { forwardRef } from 'react'
import { TriggerFrom, useDialogInterceptContext } from './dialog-intercept-context'

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ from = TriggerFrom.OPEN_TRIGGER, onClick, children, ...props }, ref) => {
    const { setTriggerFrom } = useDialogInterceptContext()

    return (
      <ArkDialog.Trigger
        ref={ref}
        onClick={(event) => {
          setTriggerFrom(from)
          onClick?.(event)
        }}
        {...props}
      >
        {children}
      </ArkDialog.Trigger>
    )
  },
)

DialogTrigger.displayName = 'Dialog.Trigger'
