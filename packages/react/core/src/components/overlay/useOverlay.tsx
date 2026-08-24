import type { ComponentType, ReactNode } from 'react'
import { createContext, useContext, useMemo, useRef, useState } from 'react'

export interface OverlayOpenChangeDetails {
  open: boolean
}

export type OverlayHostProps = {
  open?: boolean
  onOpenChange?: (details: OverlayOpenChangeDetails) => void
  onExitComplete?: () => void
}

export type OverlayOptions<P = Record<string, unknown>> = {
  defaultOpen?: boolean
  props?: P
  destroyOnClose?: boolean
}

interface ManagedOverlay {
  id: symbol
  renderKey: string
  component: ComponentType<OverlayHostProps & Record<string, unknown>>
  isMounted: boolean
  isOpen: boolean
  destroyOnClose?: boolean
  originalProps?: Record<string, unknown>
  props?: Record<string, unknown>
  resolvePromise?: (value: unknown) => void
}

export type OverlayInstance<P> = {
  id: symbol
  open: (props?: P) => OpenedOverlay
  close: (value?: unknown) => void
  patch: (props: Partial<P>) => void
}

export type OpenedOverlay = Promise<unknown> & {
  id: symbol
  isMounted: boolean
  isOpen: boolean
  result: Promise<unknown>
}

export interface OverlayApi {
  overlays: ManagedOverlay[]
  create: <P>(
    component: ComponentType<any>,
    options?: OverlayOptions<P>,
  ) => OverlayInstance<P>
  open: (id: symbol, props?: Record<string, unknown>) => OpenedOverlay
  close: (id: symbol, value?: unknown) => void
  closeAll: () => void
  patch: (id: symbol, props: Record<string, unknown>) => void
  unmount: (id: symbol) => void
  isOpen: (id: symbol) => boolean
}

const OverlayContext = createContext<OverlayApi | null>(null)

let overlaySeq = 0

export function OverlayProvider({ children }: { children?: ReactNode }) {
  const [overlays, setOverlays] = useState<ManagedOverlay[]>([])
  const overlaysRef = useRef(overlays)
  overlaysRef.current = overlays

  const api = useMemo<OverlayApi>(() => {
    const getOverlay = (id: symbol) => {
      const overlay = overlaysRef.current.find(item => item.id === id)
      if (!overlay)
        throw new Error('Overlay not found')
      return overlay
    }

    const mutate = (id: symbol, next: Partial<ManagedOverlay>) => {
      setOverlays(prev => prev.map(item => (item.id === id ? { ...item, ...next } : item)))
    }

    const open = (id: symbol, props?: Record<string, unknown>): OpenedOverlay => {
      const overlay = getOverlay(id)
      const nextProps = props
        ? { ...overlay.originalProps, ...props }
        : { ...overlay.originalProps }
      overlay.props = nextProps
      overlay.isOpen = true
      overlay.isMounted = true
      mutate(id, { props: nextProps, isOpen: true, isMounted: true })
      const result = new Promise<unknown>((resolve) => {
        overlay.resolvePromise = resolve
      })
      return Object.assign(result, {
        id,
        isMounted: true,
        isOpen: true,
        result,
      })
    }

    const close = (id: symbol, value?: unknown) => {
      const overlay = getOverlay(id)
      overlay.isOpen = false
      mutate(id, { isOpen: false })
      if (overlay.resolvePromise) {
        overlay.resolvePromise(value)
        overlay.resolvePromise = undefined
      }
    }

    const unmount = (id: symbol) => {
      const overlay = getOverlay(id)
      if (overlay.destroyOnClose) {
        setOverlays(prev => prev.filter(item => item.id !== id))
        return
      }
      overlay.isMounted = false
      mutate(id, { isMounted: false })
    }

    const patch = (id: symbol, props: Record<string, unknown>) => {
      const overlay = getOverlay(id)
      const nextProps = { ...overlay.props, ...props }
      overlay.props = nextProps
      mutate(id, { props: nextProps })
    }

    return {
      get overlays() {
        return overlaysRef.current
      },
      open,
      close,
      closeAll: () => {
        overlaysRef.current.forEach(item => close(item.id))
      },
      create: (component, options) => {
        const { props, defaultOpen, destroyOnClose } = options ?? {}
        const id = Symbol(import.meta.env?.DEV ? 'useOverlay' : '')
        const record: ManagedOverlay = {
          id,
          renderKey: `overlay-${++overlaySeq}`,
          component: component as ComponentType<OverlayHostProps & Record<string, unknown>>,
          isOpen: !!defaultOpen,
          isMounted: !!defaultOpen,
          destroyOnClose: !!destroyOnClose,
          originalProps: { ...(props as Record<string, unknown> | undefined) },
          props: { ...(props as Record<string, unknown> | undefined) },
        }
        setOverlays(prev => [...prev, record])
        return {
          id,
          open: openProps => open(id, openProps as Record<string, unknown> | undefined),
          close: value => close(id, value),
          patch: patchProps => patch(id, patchProps as Record<string, unknown>),
        }
      },
      patch,
      unmount,
      isOpen: (id: symbol) => getOverlay(id).isOpen,
    }
  }, [])

  return (
    <OverlayContext.Provider value={api}>
      {children}
      {overlays.filter(overlay => overlay.isMounted).map((overlay) => {
        const Component = overlay.component
        return (
          <Component
            key={overlay.renderKey}
            {...overlay.props}
            open={overlay.isOpen}
            onOpenChange={(details) => {
              if (!details.open)
                api.close(overlay.id)
            }}
            onExitComplete={() => api.unmount(overlay.id)}
          />
        )
      })}
    </OverlayContext.Provider>
  )
}

export function useOverlay(): OverlayApi {
  const api = useContext(OverlayContext)
  if (!api)
    throw new Error('useOverlay must be used within OverlayProvider')
  return api
}
