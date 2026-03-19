<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { LoadingStateHandler } from '.'
import { useForwardExpose } from '@raxium/vue-addons-shared'
import { LoaderCircle } from 'lucide-vue-next'
import { twMerge } from 'tailwind-merge'
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { injectVirtualContext, LOADING_STATE } from '.'

defineOptions({
  name: 'VirtualInfiniteLoading',
})
const {
  class: propsClass,
  enableFirstLoad = true,
  enableRetry = true,
  size = 'base',
} = defineProps<{
  class?: HTMLAttributes['class']
  enableFirstLoad?: boolean
  enableRetry?: boolean
  size?: 'xs' | 'sm' | 'base' | 'lg'
  ui?: {
    root?: HTMLAttributes['class']
    loading?: HTMLAttributes['class']
    spinner?: HTMLAttributes['class']
    complete?: HTMLAttributes['class']
    error?: HTMLAttributes['class']
  }
}>()

const emit = defineEmits<{ infinite: [$state: LoadingStateHandler] }>()
defineSlots<{
  loading: (props: {}) => any
  spinner: (props: {}) => any
  complete: (props: {}) => any
  error: (props: { retry: () => void }) => any
}>()

const context = injectVirtualContext()
const { infiniteState: state } = context

const stateHandler: LoadingStateHandler = {
  loading() {
    state.value = LOADING_STATE.LOADING
  },
  loaded() {
    state.value = LOADING_STATE.LOADED
  },
  complete() {
    state.value = LOADING_STATE.COMPLETE
  },
  error() {
    state.value = LOADING_STATE.ERROR
  },
}
function doInfinite() {
  stateHandler.loading()
  emit('infinite', stateHandler)
}

const { virtualizer } = injectVirtualContext()
const { forwardRef, currentRef } = useForwardExpose()
const observer = shallowRef<IntersectionObserver | null>(null)
onMounted(() => {
  if (state.value === LOADING_STATE.IDLE && enableFirstLoad) {
    doInfinite()
    return
  }
  if (state.value === LOADING_STATE.LOADED) {
    stateHandler.loading()
  }
  observer.value = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && state.value === LOADING_STATE.LOADING)
        doInfinite()
    },
    { root: context.parentEl?.value, rootMargin: '0px 0px 0px 0px' },
  )
  if (currentRef.value)
    observer.value?.observe(currentRef.value as Element)
})

onUnmounted(() => {
  observer.value?.disconnect()
  observer.value = null
})
</script>

<template>
  <div
    :ref="
      (el) => {
        if (virtualizer && el) virtualizer.measureElement(el as Element)
        forwardRef(el)
      }
    "
    :class="twMerge('rui-virtual-infinite', ui?.root, propsClass)"
    data-scope="virtual-infinite"
    data-part="root"
    :data-size="size"
  >
    <slot
      v-if="state === 'loading'"
      name="loading"
    >
      <div
        :class="twMerge('rui-virtual-infinite_loading', ui?.loading)"
        data-scope="virtual-infinite"
        data-part="loading"
        :data-size="size"
      >
        <slot name="spinner">
          <LoaderCircle
            :class="twMerge('rui-virtual-infinite_spinner', ui?.spinner)"
            data-scope="virtual-infinite"
            data-part="spinner"
            :data-size="size"
          />
        </slot>
      </div>
    </slot>
    <slot
      v-else-if="state === 'complete'"
      name="complete"
    >
      <div
        :class="twMerge('rui-virtual-infinite_complete', ui?.complete)"
        data-scope="virtual-infinite"
        data-part="complete"
        :data-size="size"
      >
        No more results!
      </div>
    </slot>
    <slot
      v-else-if="state === 'error'"
      name="error"
      :retry="doInfinite"
    >
      <div
        :class="twMerge('rui-virtual-infinite_error', ui?.error)"
        data-scope="virtual-infinite"
        data-part="error"
        :data-size="size"
      >
        <span>Oops something went wrong!</span>
        <button
          v-if="enableRetry"
          class="retry"
          @click="doInfinite"
        >
          retry
        </button>
      </div>
    </slot>
  </div>
</template>
