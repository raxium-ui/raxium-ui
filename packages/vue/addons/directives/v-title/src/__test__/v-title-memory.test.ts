import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'

vi.mock('@floating-ui/vue', () => ({
  computePosition: vi.fn(async () => ({
    x: 10,
    y: 20,
    middlewareData: { hide: { referenceHidden: false } },
  })),
  flip: () => ({}),
  shift: () => ({}),
  offset: () => ({}),
  hide: () => ({}),
}))

import { __getTitleTooltipForTest, vTitle } from '../index'

function getTooltip() {
  const instance = __getTitleTooltipForTest()
  if (!instance)
    throw new Error('TitleTooltip instance is not available')
  return instance
}

function dispatchMouseEnter(el: Element) {
  el.dispatchEvent(new Event('mouseenter', { bubbles: false }))
}

function dispatchMouseLeave(el: Element) {
  el.dispatchEvent(new Event('mouseleave', { bubbles: false }))
}

describe('v-title memory cleanup', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    getTooltip().onMouseLeave()
  })

  afterEach(() => {
    getTooltip().onMouseLeave()
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('cleans up 100 v-title items after parent unmount', async () => {
    const tooltip = getTooltip()

    const Comp = defineComponent({
      directives: { title: vTitle },
      props: { items: { type: Array, required: true } },
      template: `
        <div>
          <span
            v-for="(item, i) in items"
            :key="i"
            v-title="item"
          />
        </div>
      `,
    })

    const items = Array.from({ length: 100 }, (_, i) => `tooltip-${i}`)
    const wrapper = mount(Comp, { props: { items }, attachTo: document.body })
    await flushPromises()

    expect(wrapper.findAll('span')).toHaveLength(100)

    wrapper.unmount()
    await flushPromises()
    await nextTick()

    expect(tooltip.activeEl).toBeNull()
    expect(tooltip.pendingForEl).toBeNull()
    expect(tooltip.showTimer).toBe(0)
  })

  it('does not show tooltip when unmounted before delay elapses', async () => {
    vi.useFakeTimers()
    const tooltip = getTooltip()

    const Comp = defineComponent({
      directives: { title: vTitle },
      template: `<span v-title="'hello'">hover me</span>`,
    })

    const wrapper = mount(Comp, { attachTo: document.body })
    const el = wrapper.find('span').element
    dispatchMouseEnter(el)

    expect(tooltip.pendingForEl).toBe(el)

    wrapper.unmount()
    await flushPromises()

    vi.advanceTimersByTime(600)
    await flushPromises()

    expect(tooltip.activeEl).toBeNull()
    expect(tooltip.pendingForEl).toBeNull()
    expect(tooltip.titleTipNode.style.visibility).toBe('hidden')
  })

  it('clears active tooltip and IO when host unmounts while visible', async () => {
    vi.useFakeTimers()
    const tooltip = getTooltip()

    const Comp = defineComponent({
      directives: { title: vTitle },
      template: `<span v-title="'hello'">hover me</span>`,
    })

    const wrapper = mount(Comp, { attachTo: document.body })
    const el = wrapper.find('span').element
    dispatchMouseEnter(el)

    vi.advanceTimersByTime(500)
    await flushPromises()

    expect(tooltip.activeEl).toBe(el)
    expect(tooltip.titleTipNode.style.visibility).toBe('visible')

    wrapper.unmount()
    await flushPromises()
    await nextTick()

    expect(tooltip.activeEl).toBeNull()
    expect(tooltip.pendingForEl).toBeNull()
    expect(tooltip.showTimer).toBe(0)
    expect(tooltip.titleTipNode.style.visibility).toBe('hidden')
  })

  it('cleans up on batch unmount without mouseleave', async () => {
    vi.useFakeTimers()
    const tooltip = getTooltip()

    const Comp = defineComponent({
      directives: { title: vTitle },
      props: { items: { type: Array, required: true } },
      template: `
        <div>
          <span
            v-for="(item, i) in items"
            :key="i"
            v-title="item"
          />
        </div>
      `,
    })

    const items = Array.from({ length: 20 }, (_, i) => `tooltip-${i}`)
    const wrapper = mount(Comp, { props: { items }, attachTo: document.body })

    const hovered = wrapper.findAll('span')[3].element
    dispatchMouseEnter(hovered)
    vi.advanceTimersByTime(500)
    await flushPromises()

    expect(tooltip.activeEl).toBe(hovered)

    wrapper.unmount()
    await flushPromises()

    expect(tooltip.activeEl).toBeNull()
    expect(tooltip.pendingForEl).toBeNull()
  })

  it('hides tooltip on mouseleave', async () => {
    vi.useFakeTimers()
    const tooltip = getTooltip()

    const Comp = defineComponent({
      directives: { title: vTitle },
      template: `<span v-title="'hello'">hover me</span>`,
    })

    const wrapper = mount(Comp, { attachTo: document.body })
    const el = wrapper.find('span').element

    dispatchMouseEnter(el)
    vi.advanceTimersByTime(500)
    await flushPromises()

    expect(tooltip.activeEl).toBe(el)

    dispatchMouseLeave(el)
    await flushPromises()

    expect(tooltip.activeEl).toBeNull()
    expect(tooltip.titleTipNode.style.visibility).toBe('hidden')

    wrapper.unmount()
  })
})
