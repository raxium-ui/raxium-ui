<script lang="ts" setup>
import type { Swiper as SwiperInstance } from 'swiper/types'
import type { SwiperEmits, SwiperProps, SwiperSlots } from '.'
import { cn, useForwardPropsEmits } from '@raxium/vue-addons-shared'
import { Swiper } from 'swiper/vue'
import { ref, shallowRef } from 'vue'
import { useSwiperModule } from './utils'

defineOptions({
  inheritAttrs: false,
})

const { class: propsClass, direction = 'horizontal', ...props } = defineProps<SwiperProps>()
const emits = defineEmits<SwiperEmits>()
defineSlots<SwiperSlots>()

const forwarded = useForwardPropsEmits(props, emits)

const swiperInstance = shallowRef<SwiperInstance | null>(null)
const swiperEl = ref<HTMLElement>()
const { hasModule } = useSwiperModule(swiperInstance)

function onSwiperInit(swiper: SwiperInstance) {
  swiperEl.value = swiper.el
  swiperInstance.value = swiper
}

function onFocusIn() {
  if (hasModule('Keyboard')) {
    swiperInstance.value?.keyboard.enable()
  }
}
function onFocusOut() {
  if (hasModule('Keyboard')) {
    swiperInstance.value?.keyboard.disable()
  }
}
function onKeyDown(event: KeyboardEvent) {
  if (hasModule('Keyboard'))
    return
  const prevKey = direction === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = direction === 'vertical' ? 'ArrowDown' : 'ArrowRight'
  if (event.key === prevKey) {
    event.preventDefault()
    swiperInstance.value?.slidePrev()
    return
  }
  if (event.key === nextKey) {
    event.preventDefault()
    swiperInstance.value?.slideNext()
  }
}

defineExpose({ swiper: swiperInstance, $el: swiperEl })
</script>

<template>
  <div
    class="swiper-region"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    data-scope="swiper"
    data-part="region"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @keydown="onKeyDown"
  >
    <!-- @vue-expect-error -->
    <Swiper
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn('rui-swiper', propsClass)"
      :direction="direction"
      data-scope="swiper"
      data-part="root"
      @swiper="onSwiperInit"
    >
      <template
        v-if="$slots.default"
        #default
      >
        <slot />
      </template>
      <template
        v-if="$slots['container-start']"
        #container-start
      >
        <slot name="container-start" />
      </template>
      <template
        v-if="$slots['container-end']"
        #container-end
      >
        <slot name="container-end" />
      </template>
      <template
        v-if="$slots['wrapper-start']"
        #wrapper-start
      >
        <slot name="wrapper-start" />
      </template>
      <template
        v-if="$slots['wrapper-end']"
        #wrapper-end
      >
        <slot name="wrapper-end" />
      </template>
    </Swiper>
  </div>
</template>
