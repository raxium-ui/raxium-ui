import type { DepthFloatingType, DepthOwnerType } from '@raxium/shared/depth'
import type { ReactNode } from 'react'
import {
  addZIndexOffset,
  createDepthStore,
  DEFAULT_DEPTH_BASE_VAR,
  DEFAULT_DEPTH_STEP,
  zIndexAt,
} from '@raxium/shared/depth'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { useConfig } from './useConfig'

export type { DepthFloatingType, DepthOwnerType } from '@raxium/shared/depth'

export interface DepthOwner {
  id: string
  type: DepthOwnerType
  active: boolean
  parent?: DepthOwner
  index: number
  backdropZIndex: string
  contentZIndex: string
  floatingBaseZIndex: string
  bringToFront: () => void
}

export interface DepthFloatingLayer {
  id: string
  type: DepthFloatingType
  ownerId?: string
  order: number
  zIndex: string
}

export interface UseTeleportedDepthOptions {
  type: DepthFloatingType
  active: boolean
  fallbackZIndex?: string
}

export interface UseDepthOwnerOptions {
  active?: boolean
  baseZIndex?: string
  root?: boolean
  contentOffset?: number
  floatingOffset?: number
}

export interface UseTeleportedDepthOwnerOptions {
  type: Exclude<DepthFloatingType, 'tooltip'>
  active: boolean
  fallbackZIndex?: string
}

const DepthOwnerContext = createContext<DepthOwner | undefined>(undefined)

const depthStore = createDepthStore()
let depthSnapshot = 0
const depthListeners = new Set<() => void>()
depthStore.subscribe(() => {
  depthSnapshot += 1
  depthListeners.forEach(listener => listener())
})

function subscribeDepth(onStoreChange: () => void) {
  depthListeners.add(onStoreChange)
  return () => {
    depthListeners.delete(onStoreChange)
  }
}

function getDepthSnapshot() {
  return depthSnapshot
}

function useDepthTrack() {
  return useSyncExternalStore(subscribeDepth, getDepthSnapshot, getDepthSnapshot)
}

const ownerInstances = new Map<string, DepthOwner>()

function useDepthTokens() {
  const config = useConfig('depth')
  return {
    baseVar: config?.baseZIndex ?? DEFAULT_DEPTH_BASE_VAR,
    step: config?.step ?? DEFAULT_DEPTH_STEP,
  }
}

function resolveActiveOwner(owner: DepthOwner | undefined): DepthOwner | undefined {
  if (!owner)
    return undefined
  if (owner.active && depthStore.hasOwner(owner.id))
    return owner
  return resolveActiveOwner(owner.parent)
}

export function DepthOwnerProvider({
  owner,
  children,
}: {
  owner: DepthOwner
  children?: ReactNode
}) {
  return (
    <DepthOwnerContext.Provider value={owner}>
      {children}
    </DepthOwnerContext.Provider>
  )
}

export function useDepthOwnerContext() {
  useDepthTrack()
  return resolveActiveOwner(useContext(DepthOwnerContext))
}

export function useDepthOwner(
  type: DepthOwnerType,
  options: UseDepthOwnerOptions = {},
): DepthOwner {
  useDepthTrack()
  const parent = useContext(DepthOwnerContext)
  const { baseVar, step } = useDepthTokens()
  const idRef = useRef<string>(undefined)
  if (!idRef.current)
    idRef.current = depthStore.createId(type)
  const id = idRef.current

  const active = options.active ?? true
  const root = options.root ?? !options.baseZIndex
  const contentOffset = options.contentOffset ?? (type === 'dialog' ? 1 : 0)
  const floatingOffset = options.floatingOffset ?? (type === 'dialog' ? 2 : 1)

  const bringToFront = useCallback(() => {
    depthStore.bringOwnerToFront(id)
  }, [id])

  useEffect(() => {
    if (active)
      depthStore.registerOwner(id, type, root)
    return () => {
      depthStore.unregisterOwner(id)
      ownerInstances.delete(id)
      depthStore.unregisterFloatingsByOwner(id)
    }
  }, [id, type, root])

  useEffect(() => {
    if (active) {
      depthStore.registerOwner(id, type, root)
      bringToFront()
    }
  }, [active, bringToFront, id, type, root])

  const index = Math.max(0, depthStore.indexOfOwner(id))
  const baseZIndex = options.baseZIndex ?? zIndexAt(index, 0, baseVar, step)

  const owner: DepthOwner = {
    id,
    type,
    active,
    parent,
    index,
    backdropZIndex: baseZIndex,
    contentZIndex: addZIndexOffset(baseZIndex, contentOffset),
    floatingBaseZIndex: addZIndexOffset(baseZIndex, floatingOffset),
    bringToFront,
  }
  ownerInstances.set(id, owner)
  return owner
}

function registerFloatingLayer(
  type: DepthFloatingType,
  ownerId: string | undefined,
  baseVar: string,
  step: number,
): DepthFloatingLayer {
  const id = depthStore.createId(type)
  const registered = depthStore.registerFloating(id, type, ownerId)
  const activeOwnerId = registered.ownerId
  const order = Math.max(0, depthStore.orderOfFloating(id, activeOwnerId))
  const owner = activeOwnerId ? ownerInstances.get(activeOwnerId) : undefined

  let zIndex: string
  if (owner && depthStore.hasOwner(activeOwnerId!)) {
    zIndex = addZIndexOffset(owner.floatingBaseZIndex, order)
  }
  else {
    const rootIndex = depthStore.indexOfRootFloating(id)
    zIndex = rootIndex >= 0
      ? zIndexAt(rootIndex, 0, baseVar, step)
      : zIndexAt(0, Math.max(0, order), baseVar, step)
  }

  return {
    id,
    type,
    ownerId: activeOwnerId,
    order,
    zIndex,
  }
}

export function useTeleportedDepth(options: UseTeleportedDepthOptions) {
  useDepthTrack()
  const owner = useContext(DepthOwnerContext)
  const { baseVar, step } = useDepthTokens()
  const ownerId = resolveActiveOwner(owner)?.id
  const [layer, setLayer] = useState<DepthFloatingLayer | undefined>()

  useEffect(() => {
    if (!options.active) {
      setLayer((current) => {
        if (current)
          depthStore.unregisterFloating(current.id)
        return undefined
      })
      return
    }

    const next = registerFloatingLayer(options.type, ownerId, baseVar, step)
    setLayer(next)
    return () => {
      depthStore.unregisterFloating(next.id)
    }
  }, [options.active, options.type, ownerId, baseVar, step])

  return {
    layer,
    zIndex: layer?.zIndex ?? options.fallbackZIndex,
  }
}

export function useTeleportedDepthOwner(options: UseTeleportedDepthOwnerOptions) {
  const floating = useTeleportedDepth(options)
  const owner = useDepthOwner(options.type, {
    active: options.active,
    baseZIndex: floating.zIndex,
    root: false,
    contentOffset: 0,
    floatingOffset: 1,
  })

  return {
    ...floating,
    owner,
  }
}
