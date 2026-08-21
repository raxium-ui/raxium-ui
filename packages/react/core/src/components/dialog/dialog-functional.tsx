import type { ReactNode } from 'react'
import type { DialogFunctionalHandle, DialogOptions, OptionsStore } from './dialog-functional-host'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createOptionsStore, FunctionalDialogHost } from './dialog-functional-host'

interface RuntimeItem {
  id: string
  store: OptionsStore
  open: boolean
}

interface DialogRuntimeValue {
  mount: (options: DialogOptions) => DialogFunctionalHandle
}

const DialogRuntimeContext = createContext<DialogRuntimeValue | null>(null)

let mountSeq = 0
let registeredMount: DialogRuntimeValue['mount'] | undefined

function detachRoot(container: HTMLDivElement, root: ReturnType<typeof createRoot>) {
  root.unmount()
  container.remove()
}

function mountStandalone(options: DialogOptions): DialogFunctionalHandle {
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  const store = createOptionsStore(options)
  let open = true
  const render = () => {
    root.render(
      <FunctionalDialogHost
        store={store}
        open={open}
        onOpenChange={(details) => {
          if (!details.open) {
            open = false
            render()
          }
        }}
        onClosed={() => detachRoot(container, root)}
      />,
    )
  }
  const handle: DialogFunctionalHandle = {
    options: store.options,
    close: () => {
      open = false
      render()
    },
  }
  render()
  return handle
}

export function dialog(options: DialogOptions): DialogFunctionalHandle {
  if (registeredMount)
    return registeredMount(options)
  return mountStandalone(options)
}

export function DialogRuntimeProvider({ children }: { children?: ReactNode }) {
  const [items, setItems] = useState<RuntimeItem[]>([])

  const mount = useCallback((options: DialogOptions): DialogFunctionalHandle => {
    const id = `rui-fn-dialog-${++mountSeq}`
    const store = createOptionsStore(options)
    setItems(prev => [...prev, { id, store, open: true }])
    return {
      options: store.options,
      close: () => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, open: false } : item))
      },
    }
  }, [])

  useEffect(() => {
    registeredMount = mount
    return () => {
      if (registeredMount === mount)
        registeredMount = undefined
    }
  }, [mount])

  return (
    <DialogRuntimeContext.Provider value={{ mount }}>
      {children}
      {items.map(item => (
        <FunctionalDialogHost
          key={item.id}
          store={item.store}
          open={item.open}
          onOpenChange={(details) => {
            if (!details.open) {
              setItems(prev => prev.map(entry =>
                entry.id === item.id ? { ...entry, open: false } : entry,
              ))
            }
          }}
          onClosed={() => {
            setItems(prev => prev.filter(entry => entry.id !== item.id))
          }}
        />
      ))}
    </DialogRuntimeContext.Provider>
  )
}

export function useDialog() {
  const runtime = useContext(DialogRuntimeContext)
  return {
    dialog: {
      open: (options: DialogOptions) => (runtime?.mount ?? dialog)(options),
    },
  }
}
