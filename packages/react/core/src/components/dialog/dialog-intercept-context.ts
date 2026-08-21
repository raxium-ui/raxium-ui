import type { RefObject } from 'react'
import { createContext, useContext } from 'react'

export interface OpenChangeDetails {
  open: boolean
}

export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type InteractOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>
export type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>
export type RequestDismissEvent = CustomEvent<unknown>

export const TriggerFrom = {
  ESCAPE: 'escape',
  OPEN_TRIGGER: 'open_trigger',
  CLOSE_TRIGGER: 'close_trigger',
  CANCEL_BUTTON: 'cancel_button',
  OK_BUTTON: 'ok_button',
  OUTSIDE: 'outside',
} as const

export type TriggerFromValue = typeof TriggerFrom[keyof typeof TriggerFrom]
export type DialogTriggerFrom = TriggerFromValue | string | null | undefined

export interface DialogInterceptContextValue {
  triggerFromRef: RefObject<DialogTriggerFrom>
  setTriggerFrom: (from: DialogTriggerFrom) => void
}

export const DialogInterceptContext = createContext<DialogInterceptContextValue | null>(null)

export function useDialogInterceptContext() {
  const ctx = useContext(DialogInterceptContext)
  if (!ctx) {
    return {
      triggerFromRef: { current: undefined as DialogTriggerFrom },
      setTriggerFrom: () => {},
    } satisfies DialogInterceptContextValue
  }
  return ctx
}
