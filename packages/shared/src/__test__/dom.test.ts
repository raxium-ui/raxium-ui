import { describe, expect, it } from 'vitest'
import { findParentElementByScope, findUp } from '../dom'

function el(tag: string, attrs: Record<string, string> = {}, parent?: HTMLElement) {
  const node = document.createElement(tag)
  for (const [key, value] of Object.entries(attrs))
    node.setAttribute(key, value)
  parent?.appendChild(node)
  return node
}

describe('findUp', () => {
  it('returns false for null / empty chain', () => {
    expect(findUp(null, () => true)).toBe(false)
  })

  it('walks ancestors until predicate matches', () => {
    const root = el('div', { id: 'root' })
    const mid = el('div', { id: 'mid' }, root)
    const leaf = el('span', { id: 'leaf' }, mid)

    expect(findUp(leaf, n => n.id === 'root')).toBe(true)
    expect(findUp(leaf, n => n.id === 'missing')).toBe(false)
    expect(findUp(leaf, n => n === leaf)).toBe(true)
  })
})

describe('findParentElementByScope', () => {
  it('returns null for null start', () => {
    expect(findParentElementByScope(null, 'dialog')).toBeNull()
  })

  it('finds nearest ancestor with data-scope', () => {
    const outer = el('div', { 'data-scope': 'dialog' })
    const inner = el('div', { 'data-scope': 'menu' }, outer)
    const leaf = el('button', {}, inner)

    expect(findParentElementByScope(leaf, 'menu')).toBe(inner)
    expect(findParentElementByScope(leaf, 'dialog')).toBe(outer)
    expect(findParentElementByScope(leaf, 'tooltip')).toBeNull()
  })

  it('returns the matching scope node (part filter is currently non-strict)', () => {
    const scoped = el('div', { 'data-scope': 'dialog', 'data-part': 'content' })
    const leaf = el('span', {}, scoped)

    expect(findParentElementByScope(leaf, 'dialog', 'content')).toBe(scoped)
    // Current implementation returns the scope node even when part differs.
    expect(findParentElementByScope(leaf, 'dialog', 'backdrop')).toBe(scoped)
  })
})
