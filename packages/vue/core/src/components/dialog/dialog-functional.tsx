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

let fnDialogCounter = 0

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
  beforeClose?: DialogBeforeCloseHandler
  onOpenChange?: (details: OpenChangeDetailsWithFrom) => void
  onAfterClose?: (details: OpenChangeDetailsWithFrom) => void
  onOk?: (event: MouseEvent) => void
  onCancel?: (event: MouseEvent) => void
}

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
        type: Function as PropType<
          (details: OpenChangeDetailsWithFrom) => void
        >,
        default: () => {},
      },
    },
    setup(props) {
      const openChangeDetail = ref<OpenChangeDetails & { from: DialogTriggerFrom }>()

      return () => {
        const footerShown = opts.footer ?? true
        return (
          <Dialog
            v-model={[open.value, 'open']}
            lazy-mount
            unmount-on-exit
            beforeClose={opts.beforeClose}
            onOpenChange={(details: DialogOpenChangeDetails) => {
              openChangeDetail.value = details
              opts.onOpenChange?.(details)
            }}
            onExitComplete={() => {
              const details = openChangeDetail.value ?? { open: false, from: undefined }
              props.onAfterClose?.(details)
              opts.onAfterClose?.(details)
            }}
          >
            {{
              default: (context: UseDialogContext) => {
                if (opts.render) {
                  return (
                    <DialogContent {...(opts.widget?.content as Record<string, unknown>)}>
                      {opts.render(context)}
                    </DialogContent>
                  )
                }
                return (
                  <DialogContent {...(opts.widget?.content as Record<string, unknown>)}>
                    {opts.title && (
                      <DialogHeader {...(opts.widget?.header as Record<string, unknown>)}>
                        {{
                          default: () => {
                            return typeof opts.title === 'function'
                              ? opts.title(context)
                              : opts.title
                          },
                        }}
                      </DialogHeader>
                    )}
                    {opts.content && (
                      <DialogBody {...(opts.widget?.body as Record<string, unknown>)}>
                        {{
                          default: () => {
                            return typeof opts.content === 'function'
                              ? opts.content(context)
                              : opts.content
                          },
                        }}
                      </DialogBody>
                    )}
                    {footerShown && (
                      <DialogFooter
                        {...(opts.widget?.footer as Record<string, unknown>)}
                        onOk={opts.onOk}
                        onCancel={opts.onCancel}
                      >
                        {{
                          default: () => {
                            return typeof opts.footer === 'function'
                              ? opts.footer(context)
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
    options: opts as DialogOptions,
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
