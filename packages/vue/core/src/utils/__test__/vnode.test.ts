import type { VNode } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import {
  Comment,
  createCommentVNode,
  createTextVNode,
  defineComponent,
  Fragment,
  h,
  Text,
} from 'vue'
import {
  checkContextVNodePosition,
  excludeVNodesByName,
  excludeVNodesByNames,
  findVNodeByName,
  findVNodesByName,
  hasChildVNodeByName,
  isEmptyVNode,
  someVNode,
} from '../vnode'

function cmp(name: string) {
  return defineComponent({
    name,
    setup: () => () => null,
  })
}

describe('someVNode', () => {
  it('returns false for undefined / empty', () => {
    expect(someVNode(undefined, () => true)).toBe(false)
    expect(someVNode([], () => true)).toBe(false)
  })

  it('matches direct vnode', () => {
    const n = h('div')
    expect(someVNode(n, v => v.type === 'div')).toBe(true)
    expect(someVNode(n, v => v.type === 'span')).toBe(false)
  })

  it('recurses into array children (e.g. Fragment)', () => {
    const inner = h('span')
    const frag = h(Fragment, null, [inner])
    expect(someVNode(frag, v => v.type === 'span')).toBe(true)
  })
})

describe('findVNodeByName', () => {
  it('finds component by name with camelCase normalization', () => {
    const C = cmp('MyWidget')
    const nodes: VNode[] = [h('div'), h(C)]
    expect(findVNodeByName(nodes, 'my-widget')).toBeDefined()
    expect(findVNodeByName(nodes, 'MyWidget')).toBeDefined()
    expect((findVNodeByName(nodes, 'my-widget')!.type as any).name).toBe('MyWidget')
  })

  it('returns undefined when missing or nodes empty', () => {
    expect(findVNodeByName(undefined, 'x')).toBeUndefined()
    expect(findVNodeByName([], 'x')).toBeUndefined()
    expect(findVNodeByName([h('div')], 'Missing')).toBeUndefined()
  })

  it('walks Fragment children', () => {
    const Inner = cmp('InnerNode')
    const frag = h(Fragment, null, [h(Inner)])
    expect(findVNodeByName([frag], 'InnerNode')).toBeDefined()
  })
})

describe('findVNodesByName', () => {
  it('collects all matches', () => {
    const A = cmp('Dup')
    const nodes: VNode[] = [h(A), h('p'), h(A)]
    const found = findVNodesByName(nodes, 'Dup')
    expect(found).toHaveLength(2)
  })
})

describe('excludeVNodesByName / excludeVNodesByNames', () => {
  it('excludes one name', () => {
    const A = cmp('Keep')
    const B = cmp('Drop')
    const out = excludeVNodesByName([h(A), h(B), h('i')], 'Drop')
    expect(out).toHaveLength(2)
    expect(out.some(v => (v.type as any)?.name === 'Drop')).toBe(false)
  })

  it('excludes multiple names', () => {
    const A = cmp('A1')
    const B = cmp('A2')
    const out = excludeVNodesByNames([h(A), h(B), h('span')], ['A1', 'A2'])
    expect(out).toHaveLength(1)
    expect(out[0]!.type).toBe('span')
  })

  it('returns [] for empty input', () => {
    expect(excludeVNodesByName(undefined, 'x')).toEqual([])
  })
})

describe('hasChildVNodeByName', () => {
  it('matches root component name', () => {
    const C = cmp('RootX')
    expect(hasChildVNodeByName(h(C), 'root-x')).toBe(true)
  })

  it('matches nested component in children array', () => {
    const Inner = cmp('Nested')
    const root = h('div', [h(Inner)])
    expect(hasChildVNodeByName(root, 'Nested')).toBe(true)
  })

  it('returns false when absent', () => {
    expect(hasChildVNodeByName(undefined, 'x')).toBe(false)
    expect(hasChildVNodeByName(h('div'), 'None')).toBe(false)
  })

  it('handles vnode array at root', () => {
    const Inner = cmp('InArray')
    expect(hasChildVNodeByName([h('div'), h(Inner)], 'InArray')).toBe(true)
  })
})

describe('checkContextVNodePosition', () => {
  it('warns when single child name equals context', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const C = cmp('ContextHost')
    checkContextVNodePosition([h(C)], 'ContextHost', 'Parent')
    expect(warn).toHaveBeenCalledTimes(1)
    warn.mockRestore()
  })

  it('does not warn when multiple nodes', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const C = cmp('ContextHost')
    checkContextVNodePosition([h(C), h('div')], 'ContextHost', 'Parent')
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })
})

describe('isEmptyVNode', () => {
  it('treats null / undefined as empty', () => {
    expect(isEmptyVNode(null)).toBe(true)
    expect(isEmptyVNode(undefined)).toBe(true)
  })

  it('treats Comment as empty', () => {
    const v = createCommentVNode('x')
    expect(v.type).toBe(Comment)
    expect(isEmptyVNode(v)).toBe(true)
  })

  it('treats blank Text as empty', () => {
    expect(isEmptyVNode(createTextVNode(''))).toBe(true)
    expect(isEmptyVNode(createTextVNode('   '))).toBe(true)
  })

  it('treats non-blank Text as non-empty', () => {
    expect(isEmptyVNode(createTextVNode('a'))).toBe(false)
  })

  it('treats empty Fragment as empty', () => {
    expect(isEmptyVNode(h(Fragment, null, []))).toBe(true)
    expect(isEmptyVNode(h(Fragment, null, null as any))).toBe(true)
  })

  it('treats Fragment with only empty children as empty', () => {
    expect(
      isEmptyVNode(
        h(Fragment, null, [createCommentVNode(), createTextVNode('')]),
      ),
    ).toBe(true)
  })

  it('treats element / component as non-empty', () => {
    expect(isEmptyVNode(h('div'))).toBe(false)
    expect(isEmptyVNode(h(cmp('X')))).toBe(false)
  })

  it('requires every item in array to be empty', () => {
    expect(isEmptyVNode([createCommentVNode(), createTextVNode('')])).toBe(true)
    expect(isEmptyVNode([createCommentVNode(), h('span')])).toBe(false)
  })

  it('treats non-VNode object as empty (compat)', () => {
    expect(isEmptyVNode({} as any)).toBe(true)
  })

  it('compares Text type symbol', () => {
    const tv = createTextVNode('hi')
    expect(tv.type).toBe(Text)
  })
})
