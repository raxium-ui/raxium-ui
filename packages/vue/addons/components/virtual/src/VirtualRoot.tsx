import type { VirtualContext } from '.'
import { createContext } from '@raxium/vue-addons-shared'
import { defineComponent, ref } from 'vue'
import { LOADING_STATE } from '.'

const [injectVirtualContext, provideVirtualContext]
  = createContext<VirtualContext>('VirtualContext')

export { injectVirtualContext }

export default defineComponent({
  setup(_, { slots }) {
    const enableInfinite = ref(false)
    const infiniteState = ref<LOADING_STATE>(LOADING_STATE.IDLE)
    provideVirtualContext({
      enableInfinite,
      infiniteState,
    })
    return () => slots.default?.()
  },
})
