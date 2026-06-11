import type { CreateToasterReturn, ToastRootBaseProps, UseToastContext } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type * as toast from '@zag-js/toast'
import type { HTMLAttributes, UnwrapRef, VNode, VNodeChild } from 'vue'

export interface MessagerExpose {
  messager: RaxiumMessager
}

export interface MessageOptions<T = any> extends Omit<toast.Options<T>, 'title' | 'description'> {
  theme?: ThemeNoCrafts['theme']
  description?: VNodeChild | ((context: UnwrapRef<UseToastContext>) => VNode)
  render?: (context: UnwrapRef<UseToastContext>) => any
  showClose?: boolean
}

export interface MessageProps extends ToastRootBaseProps, ThemeNoCrafts {
  options: MessageOptions
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    description?: HTMLAttributes['class']
    icon?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
  }
}

export interface MessagerProps extends MessagerStoreProps, ThemeCrafts<'tvMessage'> {
  showClose?: boolean
}

// same as RaxiumToaster, but params is MessageOptions
export type RaxiumMessager = Omit<
  CreateToasterReturn,
  'create' | 'update' | 'error' | 'success' | 'info' | 'warning' | 'loading' | 'promise'
> & {
  create: (data: MessageOptions) => string
  update: (id: string, data: Partial<MessageOptions>) => string
  error: (data?: Partial<MessageOptions>) => void
  success: (data?: Partial<MessageOptions>) => void
  info: (data?: Partial<MessageOptions>) => void
  warning: (data?: Partial<MessageOptions>) => void
  loading: (data?: Partial<MessageOptions>) => void
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: toast.PromiseOptions<T, VNodeChild>,
    shared?: Omit<MessageOptions, 'type'>,
  ) => ReturnType<CreateToasterReturn['promise']>
}

/**
 *  to deal with vue-sfc error and  let defineProps create props right
 *  copy from @ark-ui/vue/toast/types.ts
 */
interface MessagerStoreProps {
  /**
   * The maximum number of toasts. When the number of toasts exceeds this limit, the new toasts are queued.
   * @default 24
   */
  max?: number | undefined
  /**
   * Whether to overlap the toasts
   */
  overlap?: boolean | undefined
  /**
   * The duration of the toast.
   * By default, it is determined by the type of the toast.
   */
  duration?: number | undefined
  /**
   * The gap between the toasts
   * @default 16
   */
  gap?: number | undefined
  /**
   * The offset from the safe environment edge of the viewport
   * @default "1rem"
   */
  offsets?: string | Record<'left' | 'right' | 'bottom' | 'top', string> | undefined
  /**
   * The hotkey that will move focus to the toast group
   * @default '["altKey", "KeyT"]'
   */
  hotkey?: string[] | undefined
  /**
   * The duration for the toast to kept alive before it is removed.
   * Useful for exit transitions.
   *
   * @default 200
   */
  removeDelay?: number | undefined
  /**
   * Whether to pause toast when the user leaves the browser tab
   * @default false
   */
  pauseOnPageIdle?: boolean | undefined
}
