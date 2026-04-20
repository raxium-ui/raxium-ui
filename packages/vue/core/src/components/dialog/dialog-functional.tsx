/**
 * 函数式唤起Dialog
 */
import type { UseDialogContext } from '@ark-ui/vue/dialog'
import type { ThemeProps } from '@raxium/vue/providers/theme'
import type { AppContext, PropType } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type {
  DialogBeforeCloseHandler,
  DialogOpenChangeDetails,
} from '.'
import type {
  DialogTriggerFrom,
  OpenChangeDetails,
} from './dialog-intercept-context'
import { createVNode, defineComponent, getCurrentInstance, reactive, ref, render as vueRender } from 'vue'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '.'

type OpenChangeDetailsWithFrom = OpenChangeDetails & { from: DialogTriggerFrom }

interface DialogOptions extends ThemeProps {
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
  onOpenChange?: (details: OpenChangeDetailsWithFrom) => void
  onAfterClose?: (details: OpenChangeDetailsWithFrom) => void
  beforeClose?: DialogBeforeCloseHandler
  onOk?: (event: MouseEvent) => void
  onCancel?: (event: MouseEvent) => void
}

export function dialog(options: DialogOptions, appContext?: AppContext | null) {
  const {
    title,
    content,
    footer = true,
    render,
    widget,
    onOk,
    onCancel,
    onOpenChange,
    onAfterClose,
    beforeClose,
  } = reactive(options)
  const open = ref(false)
  const DialogComponent = defineComponent({
    name: 'Dialog',
    props: {
      onAfterClose: {
        type: Function as PropType<
          (details: OpenChangeDetailsWithFrom) => void
        >,
        default: () => {},
      },
    },
    setup(props) {
      const openChangeDetail = ref<OpenChangeDetails & { from: DialogTriggerFrom }>()

      return () => {
        return (
          <Dialog
            v-model={[open.value, 'open']}
            lazy-mount
            unmount-on-exit
            beforeClose={beforeClose}
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
                            return typeof title === 'function'
                              ? title(context)
                              : title
                          },
                        }}
                      </DialogHeader>
                    )}
                    {content && (
                      <DialogBody {...(widget?.body as Record<string, unknown>)}>
                        {{
                          default: () => {
                            return typeof content === 'function'
                              ? content(context)
                              : content
                          },
                        }}
                      </DialogBody>
                    )}
                    {footer && (
                      <DialogFooter
                        {...(widget?.footer as Record<string, unknown>)}
                        onOk={onOk}
                        onCancel={onCancel}
                      >
                        {{
                          default: () => {
                            return typeof footer === 'function'
                              ? footer(context)
                              : null
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
    vnode.appContext = appContext
  }
  vueRender(vnode, container)
  open.value = true
  return {
    close: () => {
      open.value = false
    },
  }
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
