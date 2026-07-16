import { describe, expect, it, vi } from 'vitest'
import { createDepthStore } from '../store'

describe('createDepthStore', () => {
  it('creates unique ids', () => {
    const store = createDepthStore()
    expect(store.createId('dialog')).toBe('dialog-1')
    expect(store.createId('dialog')).toBe('dialog-2')
    expect(store.createId('menu')).toBe('menu-3')
  })

  it('registers root owners and reports index / hasOwner', () => {
    const store = createDepthStore()
    store.registerOwner('a', 'dialog', true)
    store.registerOwner('b', 'dialog', true)

    expect(store.hasOwner('a')).toBe(true)
    expect(store.indexOfOwner('a')).toBe(0)
    expect(store.indexOfOwner('b')).toBe(1)
    expect(store.getRoots()).toEqual([
      { id: 'a', kind: 'owner' },
      { id: 'b', kind: 'owner' },
    ])
  })

  it('does not put non-root owners into the root stack', () => {
    const store = createDepthStore()
    store.registerOwner('nested', 'popover', false)

    expect(store.hasOwner('nested')).toBe(true)
    expect(store.indexOfOwner('nested')).toBe(-1)
    expect(store.getRoots()).toEqual([])
  })

  it('is idempotent for registerOwner / registerFloating', () => {
    const store = createDepthStore()
    const notify = vi.fn()
    store.subscribe(notify)

    store.registerOwner('a', 'dialog', true)
    store.registerOwner('a', 'dialog', true)
    expect(notify).toHaveBeenCalledTimes(1)
    expect(store.getOwners()).toHaveLength(1)

    store.registerFloating('f1', 'tooltip')
    store.registerFloating('f1', 'tooltip')
    expect(store.getFloatings()).toHaveLength(1)
  })

  it('bringOwnerToFront moves a root owner to the end', () => {
    const store = createDepthStore()
    store.registerOwner('a', 'dialog', true)
    store.registerOwner('b', 'dialog', true)
    store.registerOwner('c', 'dialog', true)

    store.bringOwnerToFront('a')
    expect(store.getRoots().map(r => r.id)).toEqual(['b', 'c', 'a'])
    expect(store.indexOfOwner('a')).toBe(2)

    // already front → no-op
    const notify = vi.fn()
    store.subscribe(notify)
    store.bringOwnerToFront('a')
    expect(notify).not.toHaveBeenCalled()
  })

  it('attaches floatings to an existing owner (not root)', () => {
    const store = createDepthStore()
    store.registerOwner('dlg', 'dialog', true)

    const layer = store.registerFloating('tip', 'tooltip', 'dlg')
    expect(layer.ownerId).toBe('dlg')
    expect(store.indexOfRootFloating('tip')).toBe(-1)
    expect(store.orderOfFloating('tip', 'dlg')).toBe(0)
    expect(store.getRoots()).toEqual([{ id: 'dlg', kind: 'owner' }])
  })

  it('treats missing ownerId as a root floating', () => {
    const store = createDepthStore()
    const layer = store.registerFloating('tip', 'tooltip', 'gone')
    expect(layer.ownerId).toBeUndefined()
    expect(store.indexOfRootFloating('tip')).toBe(0)
    expect(store.getRoots()).toEqual([{ id: 'tip', kind: 'floating' }])
  })

  it('orders floatings per ownerId group', () => {
    const store = createDepthStore()
    store.registerOwner('dlg', 'dialog', true)
    store.registerFloating('a', 'tooltip', 'dlg')
    store.registerFloating('b', 'menu', 'dlg')
    store.registerFloating('orphan', 'tooltip')

    expect(store.orderOfFloating('a', 'dlg')).toBe(0)
    expect(store.orderOfFloating('b', 'dlg')).toBe(1)
    expect(store.orderOfFloating('orphan', undefined)).toBe(0)
    expect(store.orderOfFloating('missing', 'dlg')).toBe(-1)
  })

  it('unregisterOwner removes the owner but leaves floatings until explicit cleanup', () => {
    const store = createDepthStore()
    store.registerOwner('dlg', 'dialog', true)
    store.registerFloating('tip', 'tooltip', 'dlg')

    store.unregisterOwner('dlg')
    expect(store.hasOwner('dlg')).toBe(false)
    expect(store.getFloatings()).toHaveLength(1)

    store.unregisterFloatingsByOwner('dlg')
    expect(store.getFloatings()).toHaveLength(0)
  })

  it('unregisterFloating removes both floating and root entries', () => {
    const store = createDepthStore()
    store.registerFloating('tip', 'tooltip')
    store.unregisterFloating('tip')
    expect(store.getFloatings()).toEqual([])
    expect(store.getRoots()).toEqual([])
    expect(store.indexOfRootFloating('tip')).toBe(-1)
  })

  it('clear empties all stacks and notifies once', () => {
    const store = createDepthStore()
    store.registerOwner('a', 'dialog', true)
    store.registerFloating('tip', 'tooltip')

    const notify = vi.fn()
    store.subscribe(notify)
    store.clear()
    expect(store.getOwners()).toEqual([])
    expect(store.getFloatings()).toEqual([])
    expect(store.getRoots()).toEqual([])
    expect(notify).toHaveBeenCalledTimes(1)

    store.clear()
    expect(notify).toHaveBeenCalledTimes(1)
  })

  it('unsubscribe stops receiving notifications', () => {
    const store = createDepthStore()
    const notify = vi.fn()
    const stop = store.subscribe(notify)
    store.registerOwner('a', 'dialog', true)
    stop()
    store.registerOwner('b', 'dialog', true)
    expect(notify).toHaveBeenCalledTimes(1)
  })

  it('does not notify on no-op unregister', () => {
    const store = createDepthStore()
    const notify = vi.fn()
    store.subscribe(notify)
    store.unregisterOwner('missing')
    store.unregisterFloating('missing')
    store.unregisterFloatingsByOwner('missing')
    expect(notify).not.toHaveBeenCalled()
  })
})
