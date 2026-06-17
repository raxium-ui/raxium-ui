<script lang="ts" setup>
import type { Swiper as SwiperInstance } from 'swiper/types'
import type { Component } from 'vue'
import type { SwiperEmits, SwiperProps, SwiperSlots } from '.'
import { cn, useForwardPropsEmits } from '@raxium/vue-addons-shared'
import { Swiper } from 'swiper/vue'
import { h, ref, shallowRef, useAttrs, useSlots } from 'vue'
import { useSwiperKeepAlive, useSwiperModule } from './utils'

defineOptions({
  inheritAttrs: false,
})

const { class: propsClass, direction = 'horizontal', ...props } = defineProps<SwiperProps>()
const emits = defineEmits<SwiperEmits>()
defineSlots<SwiperSlots>()

const forwarded = useForwardPropsEmits(props, emits)
const slots = useSlots()
const attrs = useAttrs()

const swiperInstance = shallowRef<SwiperInstance | null>(null)
const swiperEl = ref<HTMLElement>()
const { hasModule } = useSwiperModule(swiperInstance)
const { isAlive } = useSwiperKeepAlive({ swiperInstance, swiperEl, hasModule })

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

/** Pass slots directly to swiper/vue to avoid template re-wrap triggering slot-outside-render warnings. */
function SwiperRoot() {
  if (!isAlive.value)
    return null

  return h(
    Swiper as Component,
    {
      ...forwarded.value,
      ...attrs,
      class: cn('rui-swiper', propsClass),
      direction,
      onSwiper: onSwiperInit,
      'data-scope': 'swiper',
      'data-part': 'root',
    },
    slots,
  )
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
    <SwiperRoot />
  </div>
</template>
