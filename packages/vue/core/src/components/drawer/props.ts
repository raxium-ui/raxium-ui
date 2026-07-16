import type { PolymorphicProps } from '@ark-ui/vue'
import type {
  DrawerBackdropBaseProps,
  DrawerCloseTriggerBaseProps,
  DrawerGrabberBaseProps,
  DrawerRootBaseProps,
  DrawerSnapPointChangeDetails,
  DrawerTriggerBaseProps,
  DrawerTriggerValueChangeDetails,
} from '@ark-ui/vue/drawer'
import type { DrawerVariants } from '@raxium/themes/default'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { Button } from '../button'
import type {
  DrawerTriggerFrom,
  FocusOutsideEvent,
  InteractOutsideEvent,
  OpenChangeDetails,
  PointerDownOutsideEvent,
  RequestDismissEvent,
} from './drawer-intercept-context'

export type DrawerSide = NonNullable<DrawerVariants['side']>

export type DrawerOpenChangeDetails = OpenChangeDetails & { from: DrawerTriggerFrom }

/** 关闭前钩子：调用 `done()` 后才会完成关闭；调用 `resume()` 可取消本次拦截并允许再次触发 beforeClose */
export type DrawerBeforeCloseHandler = ({
  from,
  done,
  resume,
}: {
  from: DrawerTriggerFrom
  /** `autoClose === false` 时等价于 `resume()` */
  done: (autoClose?: boolean) => void
  /** 取消本次关闭拦截，Drawer 保持打开，之后可再次进入 beforeClose */
  resume: () => void
}) => void

export interface DrawerProps extends DrawerRootBaseProps, ThemeCrafts<'tvDrawer'> {
  class?: HTMLAttributes['class']
  /**
   * Visual edge the panel attaches to (craft `side` + default `swipeDirection`).
   * Defaults to `right`. Maps to Ark logical swipe: `left→start`, `right→end`,
   * `top→up`, `bottom→down`. Explicit `swipeDirection` overrides the mapping.
   */
  side?: DrawerSide
  /** 关闭前的回调；在回调内调用 `done()` 时才会真正关闭 */
  beforeClose?: DrawerBeforeCloseHandler
}

export interface DrawerEmits {
  'update:open': [open: boolean]
  'openChange': [details: DrawerOpenChangeDetails]
  'snapPointChange': [details: DrawerSnapPointChangeDetails]
  'triggerValueChange': [details: DrawerTriggerValueChangeDetails]
  'escapeKeyDown': [event: KeyboardEvent]
  'focusOutside': [event: FocusOutsideEvent]
  'interactOutside': [event: InteractOutsideEvent]
  'pointerDownOutside': [event: PointerDownOutsideEvent]
  'requestDismiss': [event: RequestDismissEvent]
  'exitComplete': []
}

export interface DrawerBackdropProps extends DrawerBackdropBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}

export interface DrawerBodyProps extends PolymorphicProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}

export interface DrawerCloseTriggerProps extends DrawerCloseTriggerBaseProps {
  from?: DrawerTriggerFrom
}

export interface DrawerContentProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    backdrop?: HTMLAttributes['class']
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
    grabber?: HTMLAttributes['class']
    grabberIndicator?: HTMLAttributes['class']
  }
  showClose?: boolean
  /** Whether the content panel itself is draggable (Ark Content `draggable`). */
  draggable?: boolean
}

export interface DrawerFooterProps extends ThemeNoCrafts {
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

export interface DrawerHeaderProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    title?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
  }
}

export interface DrawerTriggerProps extends DrawerTriggerBaseProps {
  from?: DrawerTriggerFrom
}

export interface DrawerGrabberProps extends DrawerGrabberBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
  }
}
