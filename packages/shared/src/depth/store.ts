import type {
  DepthFloatingRecord,
  DepthFloatingType,
  DepthOwnerRecord,
  DepthOwnerType,
  DepthRootRecord,
} from './types'

export interface DepthStore {
  /** Subscribe to stack mutations. Returns an unsubscribe function. */
  subscribe: (listener: () => void) => () => void
  createId: (type: string) => string
  hasOwner: (id: string) => boolean
  registerOwner: (id: string, type: DepthOwnerType, asRoot: boolean) => void
  unregisterOwner: (id: string) => void
  bringOwnerToFront: (id: string) => void
  /**
   * Index of this id in the root stack.
   * Returns `-1` when the id is not a root layer (missing or non-root owner).
   */
  indexOfOwner: (id: string) => number
  registerFloating: (
    id: string,
    type: DepthFloatingType,
    ownerId?: string,
  ) => { id: string, ownerId?: string }
  unregisterFloating: (id: string) => void
  unregisterFloatingsByOwner: (ownerId: string) => void
  /**
   * Order among floatings that share the same `ownerId` (including `undefined`).
   * Returns `-1` when the floating id is not in that group.
   */
  orderOfFloating: (id: string, ownerId?: string) => number
  /** Root-stack index for an unowned floating. `-1` if not in roots. */
  indexOfRootFloating: (id: string) => number
  /** Remove all layers (useful in tests). */
  clear: () => void
  /** Snapshot accessors (for tests / debugging). */
  getOwners: () => readonly DepthOwnerRecord[]
  getFloatings: () => readonly DepthFloatingRecord[]
  getRoots: () => readonly DepthRootRecord[]
}

/**
 * Framework-agnostic overlay depth stack.
 *
 * Owns owner / floating / root ordering only. Callers supply CSS token values
 * (`baseVar`, `step`) when computing z-index strings via `zIndexAt`.
 */
export function createDepthStore(): DepthStore {
  let idSeed = 0
  const owners: DepthOwnerRecord[] = []
  const floatings: DepthFloatingRecord[] = []
  const roots: DepthRootRecord[] = []
  const listeners = new Set<() => void>()

  function notify() {
    for (const listener of listeners)
      listener()
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  function createId(type: string) {
    idSeed += 1
    return `${type}-${idSeed}`
  }

  function hasOwner(id: string) {
    return owners.some(owner => owner.id === id)
  }

  function registerOwner(id: string, type: DepthOwnerType, asRoot: boolean) {
    if (owners.some(owner => owner.id === id))
      return

    owners.push({ id, type })
    if (asRoot)
      roots.push({ id, kind: 'owner' })
    notify()
  }

  function unregisterOwner(id: string) {
    const ownerIndex = owners.findIndex(owner => owner.id === id)
    const rootIndex = roots.findIndex(record => record.id === id)
    if (ownerIndex === -1 && rootIndex === -1)
      return

    if (ownerIndex !== -1)
      owners.splice(ownerIndex, 1)
    if (rootIndex !== -1)
      roots.splice(rootIndex, 1)
    notify()
  }

  function bringOwnerToFront(id: string) {
    const rootIndex = roots.findIndex(record => record.id === id)
    if (rootIndex === -1 || rootIndex === roots.length - 1)
      return

    const [record] = roots.splice(rootIndex, 1)
    roots.push(record)
    notify()
  }

  function indexOfOwner(id: string) {
    return roots.findIndex(layer => layer.id === id)
  }

  function registerFloating(
    id: string,
    type: DepthFloatingType,
    ownerId?: string,
  ) {
    if (floatings.some(layer => layer.id === id))
      return { id, ownerId: floatings.find(layer => layer.id === id)?.ownerId }

    const activeOwnerId = ownerId && hasOwner(ownerId) ? ownerId : undefined
    floatings.push({ id, type, ownerId: activeOwnerId })
    if (!activeOwnerId)
      roots.push({ id, kind: 'floating' })
    notify()
    return { id, ownerId: activeOwnerId }
  }

  function unregisterFloating(id: string) {
    const index = floatings.findIndex(layer => layer.id === id)
    const rootIndex = roots.findIndex(layer => layer.id === id)
    if (index === -1 && rootIndex === -1)
      return

    if (index !== -1)
      floatings.splice(index, 1)
    if (rootIndex !== -1)
      roots.splice(rootIndex, 1)
    notify()
  }

  function unregisterFloatingsByOwner(ownerId: string) {
    const removedIds: string[] = []
    for (let i = floatings.length - 1; i >= 0; i -= 1) {
      if (floatings[i].ownerId === ownerId) {
        removedIds.push(floatings[i].id)
        floatings.splice(i, 1)
      }
    }
    if (removedIds.length === 0)
      return

    // Owned floatings are not normally in `roots`; clean defensively anyway.
    for (const removedId of removedIds) {
      const rootIndex = roots.findIndex(layer => layer.id === removedId)
      if (rootIndex !== -1)
        roots.splice(rootIndex, 1)
    }
    notify()
  }

  function orderOfFloating(id: string, ownerId?: string) {
    return floatings
      .filter(layer => layer.ownerId === ownerId)
      .findIndex(layer => layer.id === id)
  }

  function indexOfRootFloating(id: string) {
    return roots.findIndex(layer => layer.id === id)
  }

  function clear() {
    if (owners.length === 0 && floatings.length === 0 && roots.length === 0)
      return
    owners.length = 0
    floatings.length = 0
    roots.length = 0
    notify()
  }

  return {
    subscribe,
    createId,
    hasOwner,
    registerOwner,
    unregisterOwner,
    bringOwnerToFront,
    indexOfOwner,
    registerFloating,
    unregisterFloating,
    unregisterFloatingsByOwner,
    orderOfFloating,
    indexOfRootFloating,
    clear,
    getOwners: () => owners,
    getFloatings: () => floatings,
    getRoots: () => roots,
  }
}
