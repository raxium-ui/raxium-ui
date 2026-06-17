import type { Swiper as SwiperInstance } from 'swiper/types'
import type { ShallowRef } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, KeepAlive, nextTick, ref, shallowRef } from 'vue'
import Swiper from '../Swiper.vue'
import { useSwiperKeepAlive, useSwiperModule } from '../utils'

const { mockDestroy, mockAutoplayStop, createMockSwiper, resetMocks } = vi.hoisted(() => {
  const mockDestroy = vi.fn()
  const mockAutoplayStop = vi.fn()

  function createMockSwiper(options: { autoplay?: boolean } = {}) {
    const el = document.createElement('div')
    document.body.appendChild(el)

    return {
      el,
      destroy: mockDestroy,
      activeIndex: 0,
      params: options.autoplay ? { autoplay: { delay: 1000 } } : {},
      autoplay: options.autoplay
        ? { stop: mockAutoplayStop, start: vi.fn() }
        : undefined,
    }
  }

  function resetMocks() {
    mockDestroy.mockClear()
    mockAutoplayStop.mockClear()
  }

  return { mockDestroy, mockAutoplayStop, createMockSwiper, resetMocks }
})

type MockSwiper = ReturnType<typeof createMockSwiper>

function mockSwiperRef(options: { autoplay?: boolean } = {}): ShallowRef<SwiperInstance | null> {
  return shallowRef(createMockSwiper(options) as unknown as SwiperInstance)
}

vi.mock('swiper/vue', async () => {
  const vue = await import('vue')

  return {
    Swiper: vue.defineComponent({
      name: 'SwiperRoot',
      inheritAttrs: false,
      emits: ['swiper'],
      setup(_, { attrs, emit, slots }) {
        vue.onMounted(() => {
          const autoplay = attrs.autoplay != null
          emit('swiper', createMockSwiper({ autoplay }) as unknown as SwiperInstance)
        })

        return () => vue.h(
          'div',
          { class: 'mock-swiper', ...attrs },
          slots.default?.(),
        )
      },
    }),
    useSwiper: () => ref(null),
  }
})

function mountKeepAliveSwiper(options: { autoplay?: boolean } = {}) {
  const Page = defineComponent({
    name: 'SwiperPage',
    components: { Swiper },
    setup() {
      const swiperRef = ref<InstanceType<typeof Swiper> | null>(null)
      return { swiperRef }
    },
    template: options.autoplay
      ? '<Swiper ref="swiperRef" :autoplay="{ delay: 1000 }"><div>slide</div></Swiper>'
      : '<Swiper ref="swiperRef"><div>slide</div></Swiper>',
  })

  const App = defineComponent({
    name: 'KeepAliveApp',
    components: { Page },
    props: {
      show: { type: Boolean, default: true },
    },
    template: '<KeepAlive><Page v-if="show" /></KeepAlive>',
  })

  return mount(App, { props: { show: true } })
}

function getSwiperVm(wrapper: ReturnType<typeof mountKeepAliveSwiper>) {
  const page = wrapper.findComponent({ name: 'SwiperPage' })
  return page.findComponent(Swiper).vm as InstanceType<typeof Swiper> & {
    swiper: { value: MockSwiper | null }
  }
}

describe('useSwiperKeepAlive', () => {
  beforeEach(() => {
    resetMocks()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('destroys swiper on deactivate and clears refs', async () => {
    const swiperInstance = mockSwiperRef()
    const swiperEl = ref<HTMLElement | undefined>(swiperInstance.value!.el)
    const { hasModule } = useSwiperModule(swiperInstance)

    const Inner = defineComponent({
      setup() {
        useSwiperKeepAlive({ swiperInstance, swiperEl, hasModule })
        return () => h('div')
      },
    })

    const App = defineComponent({
      props: { show: { type: Boolean, default: true } },
      setup(props) {
        return () => h(KeepAlive, null, () => (props.show ? h(Inner) : null))
      },
    })

    const wrapper = mount(App, { props: { show: true } })
    await wrapper.setProps({ show: false })
    await nextTick()

    expect(mockDestroy).toHaveBeenCalledWith(true, true)
    expect(swiperInstance.value).toBeNull()
    expect(swiperEl.value).toBeUndefined()
  })

  it('stops autoplay on deactivate', async () => {
    const swiperInstance = mockSwiperRef({ autoplay: true })
    const swiperEl = ref<HTMLElement | undefined>(swiperInstance.value!.el)
    const { hasModule } = useSwiperModule(swiperInstance)

    const Inner = defineComponent({
      setup() {
        useSwiperKeepAlive({ swiperInstance, swiperEl, hasModule })
        return () => h('div')
      },
    })

    const App = defineComponent({
      props: { show: { type: Boolean, default: true } },
      setup(props) {
        return () => h(KeepAlive, null, () => (props.show ? h(Inner) : null))
      },
    })

    const wrapper = mount(App, { props: { show: true } })
    await wrapper.setProps({ show: false })
    await nextTick()

    expect(mockAutoplayStop).toHaveBeenCalled()
  })

  it('cleans up on beforeUnmount', async () => {
    const swiperInstance = mockSwiperRef()
    const swiperEl = ref<HTMLElement | undefined>(swiperInstance.value!.el)
    const { hasModule } = useSwiperModule(swiperInstance)

    const Inner = defineComponent({
      setup() {
        useSwiperKeepAlive({ swiperInstance, swiperEl, hasModule })
        return () => h('div')
      },
    })

    const wrapper = mount(Inner)
    wrapper.unmount()

    expect(mockDestroy).toHaveBeenCalledWith(true, true)
    expect(swiperInstance.value).toBeNull()
  })
})

describe('swiper keep-alive integration', () => {
  beforeEach(() => {
    resetMocks()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('destroys swiper instance when deactivated', async () => {
    const wrapper = mountKeepAliveSwiper()
    await flushPromises()

    const swiperVm = getSwiperVm(wrapper)
    expect(swiperVm.swiper).toBeTruthy()

    await wrapper.setProps({ show: false })
    await nextTick()

    expect(swiperVm.swiper).toBeNull()
    expect(mockDestroy).toHaveBeenCalledWith(true, true)
  })

  it('rebuilds swiper instance when reactivated', async () => {
    const wrapper = mountKeepAliveSwiper()
    await flushPromises()

    const swiperVm = getSwiperVm(wrapper)
    const firstInstance = swiperVm.swiper

    await wrapper.setProps({ show: false })
    await nextTick()
    await wrapper.setProps({ show: true })
    await flushPromises()

    expect(swiperVm.swiper).toBeTruthy()
    expect(swiperVm.swiper).not.toBe(firstInstance)
    expect(swiperVm.swiper!.el.isConnected).toBe(true)
  })

  it('does not keep autoplay running after deactivate', async () => {
    vi.useFakeTimers()

    const wrapper = mountKeepAliveSwiper({ autoplay: true })
    await flushPromises()

    const swiperVm = getSwiperVm(wrapper)
    const indexBefore = swiperVm.swiper!.activeIndex

    await wrapper.setProps({ show: false })
    await nextTick()

    expect(mockAutoplayStop).toHaveBeenCalled()

    vi.advanceTimersByTime(5000)
    expect(swiperVm.swiper).toBeNull()
    expect(indexBefore).toBe(0)
  })

  it('destroys swiper on unmount', async () => {
    const wrapper = mountKeepAliveSwiper()
    await flushPromises()

    const swiperVm = getSwiperVm(wrapper)
    expect(swiperVm.swiper).toBeTruthy()

    wrapper.unmount()

    expect(mockDestroy).toHaveBeenCalledWith(true, true)
  })
})
