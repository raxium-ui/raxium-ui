import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@ark-ui/vue'

export interface OpenChangeDetails {
  open: boolean
}

export type FocusOutsideEvent = CustomEvent<EventDetails<FocusEvent>>
export type InteractOutsideEvent = CustomEvent<EventDetails<FocusEvent>>
export type PointerDownOutsideEvent = CustomEvent<EventDetails<PointerEvent>>
export type RequestDismissEvent = CustomEvent<LayerDismissEventDetail>

export enum TriggerFrom {
  ESCAPE = 'escape',
  OPEN_TRIGGER = 'open_trigger',
  CLOSE_TRIGGER = 'close_trigger',
  CANCEL_BUTTON = 'cancel_button',
  OK_BUTTON = 'ok_button',
  OUTSIDE = 'outside',
}
export type DialogTriggerFrom = TriggerFrom | string | null | undefined

export interface DialogInterceptContext {
  triggerFrom: Ref<DialogTriggerFrom>
}

export const [provideDialogInterceptContext, injectDialogInterceptContext]
  = createContext<ComputedRef<DialogInterceptContext>>('DialogInterceptContext')
