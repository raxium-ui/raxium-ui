import type { UseDialogContext } from '@ark-ui/react/dialog'
import type { ThemeCrafts } from '@raxium/react/providers/theme'
import type { ReactNode } from 'react'
import type {
  DialogBodyProps,
  DialogContentProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOpenChangeDetails,
  DialogProps,
} from './props'
import { useDialogContext } from '@ark-ui/react/dialog'
import { useSyncExternalStore } from 'react'
import { DialogRoot } from './Dialog'
import { DialogBody } from './DialogBody'
import { DialogContent } from './DialogContent'
import { DialogFooter } from './DialogFooter'
import { DialogHeader } from './DialogHeader'

type DialogPassthroughProps = ThemeCrafts<'tvDialog'>
  & Pick<
    DialogProps,
    | 'beforeClose'
    | 'lazyMount'
    | 'unmountOnExit'
    | 'modal'
    | 'closeOnEscape'
    | 'closeOnInteractOutside'
    | 'role'
    | 'trapFocus'
    | 'preventScroll'
    | 'restoreFocus'
    | 'id'
    | 'ids'
    | 'initialFocusEl'
    | 'finalFocusEl'
    | 'persistentElements'
  >

type Renderable = ReactNode | ((context: UseDialogContext) => ReactNode)

export interface DialogFunctionalFields {
  title?: Renderable
  content?: Renderable
  footer?: boolean | ((context: UseDialogContext) => ReactNode)
  render?: (context: UseDialogContext) => ReactNode
  widget?: {
    header?: DialogHeaderProps
    content?: DialogContentProps
    body?: DialogBodyProps
    footer?: DialogFooterProps
  }
  onAfterClose?: (details: DialogOpenChangeDetails) => void
  onOk?: DialogFooterProps['onOk']
  onCancel?: DialogFooterProps['onCancel']
  onOpenChange?: (details: DialogOpenChangeDetails) => void
}

export type DialogOptions = DialogPassthroughProps & DialogFunctionalFields

export interface DialogFunctionalHandle {
  options: DialogOptions
  close: () => void
}

export interface OptionsStore {
  options: DialogOptions
  subscribe: (onStoreChange: () => void) => () => void
  getSnapshot: () => number
}

function proxyDeep<T extends object>(target: T, notify: () => void): T {
  return new Proxy(target, {
    get(obj, key, receiver) {
      const value = Reflect.get(obj, key, receiver)
      if (value && typeof value === 'object')
        return proxyDeep(value as object, notify)
      return value
    },
    set(obj, key, value, receiver) {
      const ok = Reflect.set(obj, key, value, receiver)
      notify()
      return ok
    },
  })
}

export function createOptionsStore(initial: DialogOptions): OptionsStore {
  let version = 0
  const listeners = new Set<() => void>()
  const notify = () => {
    version += 1
    listeners.forEach(fn => fn())
  }
  return {
    options: proxyDeep(initial, notify),
    subscribe: (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    getSnapshot: () => version,
  }
}

function resolveRenderable(value: Renderable | undefined, context: UseDialogContext) {
  return typeof value === 'function' ? value(context) : value
}

function FunctionalDialogTree({ options }: { options: DialogOptions }) {
  const context = useDialogContext()
  const { title, content, footer, render, widget, onOk, onCancel } = options
  const footerShown = footer ?? true

  if (render) {
    return <DialogContent {...widget?.content}>{render(context)}</DialogContent>
  }

  return (
    <DialogContent {...widget?.content}>
      {title != null && (
        <DialogHeader {...widget?.header}>{resolveRenderable(title, context)}</DialogHeader>
      )}
      {content != null && (
        <DialogBody {...widget?.body}>{resolveRenderable(content, context)}</DialogBody>
      )}
      {footerShown && (
        <DialogFooter
          {...widget?.footer}
          onOk={onOk}
          onCancel={onCancel}
        >
          {typeof footer === 'function' ? footer(context) : undefined}
        </DialogFooter>
      )}
    </DialogContent>
  )
}

export function FunctionalDialogHost({
  store,
  open,
  onOpenChange,
  onClosed,
}: {
  store: OptionsStore
  open: boolean
  onOpenChange?: DialogProps['onOpenChange']
  onClosed: () => void
}) {
  useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)
  const options = store.options
  const {
    title: _t,
    content: _c,
    footer: _f,
    render: _r,
    widget: _w,
    onOk: _ok,
    onCancel: _cancel,
    onAfterClose,
    onOpenChange: optionsOnOpenChange,
    ...dialogProps
  } = options

  return (
    <DialogRoot
      {...dialogProps}
      open={open}
      onOpenChange={(details) => {
        optionsOnOpenChange?.(details)
        onOpenChange?.(details)
      }}
      onExitComplete={() => {
        onAfterClose?.({ open: false, from: undefined })
        onClosed()
      }}
    >
      <FunctionalDialogTree options={options} />
    </DialogRoot>
  )
}
