import type { DirectiveBinding } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import LazyEx from '../lazy'
import ReactiveListenerEx from '../listener'

const TINY_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

function createBinding(value: string | { src: string } = TINY_PNG): DirectiveBinding {
  return {
    value,
    arg: 'src',
    modifiers: {},
    instance: null,
    dir: {},
    oldValue: undefined,
  } as unknown as DirectiveBinding
}

function createLazyDirective(lazy: LazyEx) {
  return {
    beforeMount: lazy.add.bind(lazy),
    beforeUpdate: lazy.update.bind(lazy),
    updated: lazy.lazyLoadHandler.bind(lazy),
    unmounted: lazy.remove.bind(lazy),
  }
}

describe('lazyEx memory cleanup', () => {
  let lazy: LazyEx

  beforeEach(() => {
    lazy = new LazyEx({ silent: true, throttleWait: 0, observer: false })
    document.body.innerHTML = ''
  })

  afterEach(() => {
    lazy.ListenerQueue.forEach((item) => {
      if (item.el)
        lazy.remove(item.el as HTMLElement)
    })
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('does not enqueue listener when element is not connected', async () => {
    const el = document.createElement('img')
    lazy.add(el, createBinding(), null as never)
    await nextTick()
    await nextTick()

    expect(lazy.ListenerQueue).toHaveLength(0)
  })

  it('does not leave zombie listener after remove before add nextTick', async () => {
    const el = document.createElement('img')
    document.body.appendChild(el)

    lazy.add(el, createBinding(), null as never)
    lazy.remove(el)
    await nextTick()
    await nextTick()

    expect(lazy.ListenerQueue).toHaveLength(0)
  })

  it('removes listener and clears el reference on remove', async () => {
    const el = document.createElement('img')
    document.body.appendChild(el)

    lazy.add(el, createBinding(), null as never)
    await nextTick()
    await nextTick()

    expect(lazy.ListenerQueue).toHaveLength(1)
    expect(lazy.ListenerQueue[0].el).toBe(el)

    lazy.remove(el)

    expect(lazy.ListenerQueue).toHaveLength(0)
    expect((lazy.ListenerQueue[0] as ReactiveListenerEx | undefined)?.el).toBeUndefined()
  })

  it('reuses a single bound elRenderer for all listeners', async () => {
    const el1 = document.createElement('img')
    const el2 = document.createElement('img')
    document.body.append(el1, el2)

    lazy.add(el1, createBinding(), null as never)
    lazy.add(el2, createBinding(), null as never)
    await nextTick()
    await nextTick()

    const renderers = lazy.ListenerQueue.map(item => item.elRenderer)
    expect(renderers[0]).toBe(renderers[1])
  })

  it('purges detached listeners on remove without waiting for scroll', async () => {
    const el = document.createElement('img')
    document.body.appendChild(el)

    lazy.add(el, createBinding(), null as never)
    await nextTick()
    await nextTick()

    document.body.removeChild(el)
    lazy.remove(el)

    expect(lazy.ListenerQueue).toHaveLength(0)
  })
})

describe('lazyEx loadingDelay timers', () => {
  let lazy: LazyEx

  beforeEach(() => {
    vi.useFakeTimers()
    lazy = new LazyEx({ silent: true, throttleWait: 0, observer: false, loadingDelay: 100 })
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('tracks per-element timers independently', () => {
    const el1 = document.createElement('img')
    const el2 = document.createElement('img')
    document.body.append(el1, el2)

    lazy._scheduleLoadingDelay(el1, () => el1.setAttribute('done', '1'))
    lazy._scheduleLoadingDelay(el2, () => el2.setAttribute('done', '1'))

    expect(lazy.loadingDelayTimers.size).toBe(2)

    lazy.remove(el1)

    expect(lazy.loadingDelayTimers.has(el1)).toBe(false)
    expect(lazy.loadingDelayTimers.has(el2)).toBe(true)
  })

  it('does not run delayed callback after element is removed', () => {
    const el = document.createElement('img')
    document.body.appendChild(el)

    lazy._scheduleLoadingDelay(el, () => el.setAttribute('done', '1'))
    document.body.removeChild(el)
    lazy.remove(el)

    vi.advanceTimersByTime(200)

    expect(el.getAttribute('done')).toBeNull()
    expect(lazy.loadingDelayTimers.size).toBe(0)
  })

  it('replaces pending timer for the same element without orphaning', () => {
    const el = document.createElement('img')
    document.body.appendChild(el)

    lazy._scheduleLoadingDelay(el, () => el.setAttribute('done', 'first'))
    lazy._scheduleLoadingDelay(el, () => el.setAttribute('done', 'second'))

    expect(lazy.loadingDelayTimers.size).toBe(1)

    vi.advanceTimersByTime(100)

    expect(el.getAttribute('done')).toBe('second')
  })
})

describe('reactiveListenerEx destroyed guard', () => {
  it('$destroy clears references and blocks render', () => {
    const el = document.createElement('img')
    const render = vi.fn()
    const listener = new ReactiveListenerEx(
      el,
      TINY_PNG,
      '',
      '',
      'src',
      document.body,
      { silent: true, attempt: 3, adapter: {}, filter: {} },
      '',
      render,
      { has: () => false, add: () => {} } as never,
    )

    listener.$destroy()

    expect(listener.el).toBeNull()
    expect(listener.$parent).toBeNull()
    expect(listener.destroyed).toBe(true)

    render.mockClear()
    listener.render('loaded', false)
    expect(render).not.toHaveBeenCalled()
  })

  it('skips async load callbacks after destroy', async () => {
    const el = document.createElement('img')
    document.body.appendChild(el)

    const lazy = new LazyEx({ silent: true, throttleWait: 0, observer: false })
    const renderSpy = vi.spyOn(lazy, '_elRenderer')

    lazy.add(el, createBinding(), null as never)
    await nextTick()
    await nextTick()

    const listener = lazy.ListenerQueue[0] as ReactiveListenerEx
    listener.load()
    listener.$destroy()
    lazy.remove(el)

    await flushPromises()

    const callsAfterDestroy = renderSpy.mock.calls.filter(([target]) => target === listener)
    expect(callsAfterDestroy).toHaveLength(0)
    expect(lazy.ListenerQueue).toHaveLength(0)
  })
})

describe('v-lazy directive integration', () => {
  it('cleans up listener when component unmounts', async () => {
    const lazy = new LazyEx({ silent: true, throttleWait: 0, observer: false })
    const addSpy = vi.spyOn(lazy, 'add')

    const Comp = defineComponent({
      directives: { lazy: createLazyDirective(lazy) },
      props: { show: Boolean },
      template: `<img v-if="show" v-lazy="src" />`,
      setup: () => ({ src: TINY_PNG }),
    })

    const wrapper = mount(Comp, { props: { show: true } })
    await flushPromises()
    await nextTick()

    expect(addSpy).toHaveBeenCalled()
    expect(wrapper.find('img').exists()).toBe(true)

    await wrapper.setProps({ show: false })
    await flushPromises()
    await nextTick()

    expect(lazy.ListenerQueue).toHaveLength(0)
    expect(lazy.ListenerQueue.every(item => item.el == null)).toBe(true)
  })

  it('cleans up when mounted component is immediately unmounted', async () => {
    const lazy = new LazyEx({ silent: true, throttleWait: 0, observer: false })

    const Comp = defineComponent({
      directives: { lazy: createLazyDirective(lazy) },
      template: `<img v-lazy="src" />`,
      setup: () => ({ src: TINY_PNG }),
    })

    const wrapper = mount(Comp)
    wrapper.unmount()
    await flushPromises()
    await nextTick()
    await nextTick()

    expect(lazy.ListenerQueue).toHaveLength(0)
  })
})
