import type Lazy from './lazy'
import { computed, createVNode, defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useCheckInView } from './useCheckInView'

export default (lazy: Lazy) => {
  return defineComponent({
    props: {
      tag: {
        type: String,
        default: 'div',
      },
    },
    emits: ['show'],
    setup(props, { emit, slots }) {
      const el = ref<HTMLElement>()
      const state = reactive({
        loaded: false,
        error: false,
        attempt: 0,
      })
      const show = ref(false)
      const { rect, checkInView } = useCheckInView(el, lazy.options.preLoad!)
      const load = () => {
        show.value = true
        state.loaded = true
        emit('show', show.value)
      }
      const vm = computed(() => {
        return {
          el: el.value,
          rect,
          checkInView,
          load,
          state,
        }
      })

      // Track the exact vm reference registered with the lazy manager. `vm`
      // is a computed and may yield a fresh object identity each time `.value`
      // is read (state mutations invalidate it), so calling `removeComponent`
      // with a later `vm.value` would miss the original entry and leak it.
      let registered: any = null

      onMounted(() => {
        registered = vm.value
        lazy.addLazyBox(registered)
        lazy.lazyLoadHandler()
      })

      onUnmounted(() => {
        if (registered) {
          lazy.removeComponent(registered)
          registered = null
        }
      })

      return () =>
        createVNode(
          props.tag,
          {
            ref: el,
          },
          [show.value && slots.default?.()],
        )
    },
  })
}
