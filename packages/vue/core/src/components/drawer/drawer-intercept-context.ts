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
  SWIPE = 'swipe',
}
export type DrawerTriggerFrom = TriggerFrom | string | null | undefined

export interface DrawerInterceptContext {
  triggerFrom: Ref<DrawerTriggerFrom>
}

export const [provideDrawerInterceptContext, injectDrawerInterceptContext]
  = createContext<ComputedRef<DrawerInterceptContext>>('DrawerInterceptContext')
