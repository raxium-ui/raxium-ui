/**
 * 函数式唤起Dialog
 */
import type { UseDialogContext } from '@ark-ui/vue/dialog'
import type { ThemeCrafts } from '@raxium/vue/providers/theme'
import type { AppContext, HTMLAttributes, PropType } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { DialogBeforeCloseHandler, DialogOpenChangeDetails } from '.'
import type { DialogTriggerFrom, OpenChangeDetails } from './dialog-intercept-context'
import {
  createVNode,
  defineComponent,
  getCurrentInstance,
  reactive,
  ref,
  render as vueRender,
} from 'vue'
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from '.'

type OpenChangeDetailsWithFrom = OpenChangeDetails & { from: DialogTriggerFrom }

let fnDialogCounter = 0

/** 可透传至底层 `<Dialog>` 的 props（对齐 `DialogProps`，不含 open 等由函数式 API 托管的字段） */
interface DialogPassthroughProps extends ThemeCrafts<'tvDialog'> {
  'class'?: HTMLAttributes['class']
  'beforeClose'?: DialogBeforeCloseHandler
  'lazyMount'?: boolean
  'unmountOnExit'?: boolean
  'modal'?: boolean
  'closeOnEscape'?: boolean
  'closeOnInteractOutside'?: boolean
  'role'?: 'dialog' | 'alertdialog'
  'trapFocus'?: boolean
  'preventScroll'?: boolean
  'restoreFocus'?: boolean
  'id'?: string
  'ids'?: Partial<{
    trigger: string
    positioner: string
    backdrop: string
    content: string
    closeTrigger: string
    title: string
    description: string
  }>
  'initialFocusEl'?: () => HTMLElement | null
  'finalFocusEl'?: () => HTMLElement | null
  'persistentElements'?: (() => Element | null)[]
  'triggerValue'?: string | null
  'defaultTriggerValue'?: string | null
  'aria-label'?: string
}

/** 函数式 API 专属字段，不透传给底层 `<Dialog>` */
interface DialogFunctionalFields {
  title?: string | ((context: UseDialogContext) => any)
  content?: string | ((context: UseDialogContext) => any)
  footer?: boolean | ((context: UseDialogContext) => any)
  render?: (context: UseDialogContext) => any
  widget?: {
    header?: ComponentProps<typeof DialogHeader>
    content?: ComponentProps<typeof DialogContent>
    body?: ComponentProps<typeof DialogBody>
    footer?: ComponentProps<typeof DialogFooter>
  }
  /** 关闭动画结束后（对应 `<Dialog @exit-complete />`） */
  onAfterClose?: (details: OpenChangeDetailsWithFrom) => void
  onOk?: (event: MouseEvent) => void
  onCancel?: (event: MouseEvent) => void
  /** 打开状态变化（含 `from` 来源，对应 `<Dialog @open-change />`） */
  onOpenChange?: (details: OpenChangeDetailsWithFrom) => void
}

export type DialogOptions = DialogPassthroughProps & DialogFunctionalFields

export interface DialogFunctionalHandle {
  /** 与传入对象同一 reactive 引用，修改字段可使弹窗内容同步更新 */
  options: DialogOptions
  close: () => void
}

export function dialog(
  options: DialogOptions,
  appContext?: AppContext | null,
): DialogFunctionalHandle {
  const open = ref(false)
  const opts = reactive(options)
  const DialogComponent = defineComponent({
    name: 'Dialog',
    props: {
      onAfterClose: {
        type: Function as PropType<(details: OpenChangeDetailsWithFrom) => void>,
        default: () => {},
      },
    },
    setup(props) {
      const openChangeDetail = ref<OpenChangeDetails & { from: DialogTriggerFrom }>()

      return () => {
        const {
          title,
          content,
          footer,
          render,
          widget,
          onOk,
          onCancel,
          onOpenChange,
          onAfterClose,
          ...dialogProps
        } = opts
        const footerShown = footer ?? true
        return (
          <Dialog
            {...(dialogProps as Record<string, unknown>)}
            v-model={[open.value, 'open']}
            onOpenChange={(details: DialogOpenChangeDetails) => {
              openChangeDetail.value = details
              onOpenChange?.(details)
            }}
            onExitComplete={() => {
              const details = openChangeDetail.value ?? { open: false, from: undefined }
              props.onAfterClose?.(details)
              onAfterClose?.(details)
            }}
          >
            {{
              default: (context: UseDialogContext) => {
                if (render) {
                  return (
                    <DialogContent {...(widget?.content as Record<string, unknown>)}>
                      {render(context)}
                    </DialogContent>
                  )
                }
                return (
                  <DialogContent {...(widget?.content as Record<string, unknown>)}>
                    {title && (
                      <DialogHeader {...(widget?.header as Record<string, unknown>)}>
                        {{
                          default: () => {
                            return typeof title === 'function' ? title(context) : title
                          },
                        }}
                      </DialogHeader>
                    )}
                    {content && (
                      <DialogBody {...(widget?.body as Record<string, unknown>)}>
                        {{
                          default: () => {
                            return typeof content === 'function' ? content(context) : content
                          },
                        }}
                      </DialogBody>
                    )}
                    {footerShown && (
                      <DialogFooter
                        {...(widget?.footer as Record<string, unknown>)}
                        onOk={onOk}
                        onCancel={onCancel}
                      >
                        {{
                          default: () => {
                            return typeof footer === 'function' ? footer(context) : null
                          },
                        }}
                      </DialogFooter>
                    )}
                  </DialogContent>
                )
              },
            }}
          </Dialog>
        )
      }
    },
  })

  const container = document.createElement('div')
  const vnode = createVNode(DialogComponent, {
    onAfterClose: () => {
      vueRender(null, container)
    },
  })
  if (appContext) {
    vnode.appContext = {
      ...appContext,
      config: {
        ...appContext.config,
        idPrefix: `rui-fn-dialog-${++fnDialogCounter}`,
      },
    }
  }
  vueRender(vnode, container)
  open.value = true
  return {
    close: () => {
      open.value = false
    },
    options: opts,
  } as unknown as DialogFunctionalHandle
}

/**
 * 在组件内部使用，自动捕获当前 App 上下文（插件、全局组件等）并传入 dialog()。
 * 推荐在组件 setup 中调用以替代直接调用 dialog()。
 */
export function useDialog() {
  const instance = getCurrentInstance()
  const appContext = instance?.appContext ?? null
  return {
    dialog: {
      open: (options: DialogOptions) => dialog(options, appContext),
    },
  }
}
