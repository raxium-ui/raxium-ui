import type { CreateToasterReturn, ToastRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type * as toast from '@zag-js/toast'
import type * as ZagToast from '@zag-js/toast'
import type {
  ComputedRef,
  CSSProperties,
  HTMLAttributes,
  NativeElements,
  ReservedProps,
  UnwrapRef,
  VNode,
  VNodeChild,
} from 'vue'

type Attrs<T> = T & ReservedProps
type PropTypes = NativeElements & {
  element: Attrs<HTMLAttributes>
  style: CSSProperties
}
export interface UseToastContext extends ComputedRef<ZagToast.Api<PropTypes>> {}
export interface ToastOptions<T = any> extends Omit<toast.Options<T>, 'title' | 'description'> {
  placement?: toast.Placement
  theme?: ThemeNoCrafts['theme']
  title?: VNodeChild | ((context: UnwrapRef<UseToastContext>) => VNode)
  description?: VNodeChild | ((context: UnwrapRef<UseToastContext>) => VNode)
  render?: (context: UnwrapRef<UseToastContext>) => any
}

export const DEFAULT_TOASTER_ID = 'default-toaster'
export interface ToasterManagerExpose {
  toasters: ToasterWrap[]
}
export interface ToasterWrap {
  toasterId?: string
  toaster: CreateToasterReturn
}

export interface ToastProps extends ToastRootBaseProps, ThemeNoCrafts {
  options: ToastOptions
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
    title?: HTMLAttributes['class']
    description?: HTMLAttributes['class']
    icon?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
  }
}

export interface ToasterManagerProps {
  disableDefaultToaster?: boolean
  defaultToasterProps?: ToasterProps
}

export interface ToasterProps extends ToastStoreProps, ThemeCrafts<'tvToast'> {
  toasterId?: string
}

/**
 *  to deal with vue-sfc error and  let defineProps create props right
 *  copy from @ark-ui/vue/toast/types.ts
 */
interface ToastStoreProps {
  /**
   * The placement of the toast
   * @default "bottom"
   */
  placement?: toast.Placement | undefined
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
