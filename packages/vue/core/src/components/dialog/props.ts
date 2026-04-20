import type {
  DialogBackdropBaseProps,
  DialogCloseTriggerBaseProps,
  DialogRootBaseProps,
  DialogRootEmits,
  DialogTriggerBaseProps,
  PolymorphicProps,
} from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { Button } from '../button'
import type {
  DialogTriggerFrom,
  FocusOutsideEvent,
  InteractOutsideEvent,
  OpenChangeDetails,
  PointerDownOutsideEvent,
  RequestDismissEvent,
} from './dialog-intercept-context'

// types
export type DialogOpenChangeDetails = OpenChangeDetails & { from: DialogTriggerFrom }

/** 关闭前钩子：调用 `done()` 后才会完成关闭（与 Ark 的 `onOpenChange` 透传可同时使用，关闭流程会先经过此处） */
export type DialogBeforeCloseHandler = ({
  from,
  done,
}: {
  from: DialogTriggerFrom
  done: () => void
}) => void

export interface DialogProps extends DialogRootBaseProps, ThemeCrafts<'tvDialog'> {
  class?: HTMLAttributes['class']
  /** 关闭前的回调；在回调内调用 `done()` 时才会真正关闭 */
  beforeClose?: DialogBeforeCloseHandler
}
export interface DialogEmits extends DialogRootEmits {
  'update:open': [open: boolean]
  'openChange': [details: DialogOpenChangeDetails]
  'escapeKeyDown': [event: KeyboardEvent]
  'focusOutside': [event: FocusOutsideEvent]
  'interactOutside': [event: InteractOutsideEvent]
  'pointerDownOutside': [event: PointerDownOutsideEvent]
  'requestDismiss': [event: RequestDismissEvent]
  'exitComplete': []
}
export interface DialogBackdropProps extends DialogBackdropBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface DialogBodyProps extends PolymorphicProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface DialogCloseTriggerProps extends DialogCloseTriggerBaseProps {
  from?: DialogTriggerFrom
}
export interface DialogContentProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    backdrop?: HTMLAttributes['class']
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
  }
  showClose?: boolean
}
export interface DialogFooterProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    cancel?: HTMLAttributes['class']
    ok?: HTMLAttributes['class']
  }
  widget?: {
    cancel?: ComponentProps<typeof Button> & { text?: string }
    ok?: ComponentProps<typeof Button> & { text?: string }
  }
}
export interface DialogHeaderProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    title?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
  }
}
export interface DialogTriggerProps extends DialogTriggerBaseProps {
  from?: DialogTriggerFrom
}
