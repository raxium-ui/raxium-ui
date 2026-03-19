<script setup lang="ts">
import type { ScrollbarEvents } from 'swiper/types'
import type { SwiperScrollbarProps } from '.'
import { useForwardProps } from '@raxium/vue-addons-shared'
import { merge } from 'es-toolkit/compat'
import { useSwiper } from 'swiper/vue'
import { twMerge } from 'tailwind-merge'
import { computed, useTemplateRef, watch } from 'vue'
import { useRegistSwiperEmits, useSwiperModule } from './utils'

const { class: propsClass, swiper, ...props } = defineProps<SwiperScrollbarProps>()
const emit = defineEmits<ScrollbarEvents>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { hasModule } = useSwiperModule(effectiveSwiper)
const scrollRef = useTemplateRef('scrollbar')
const forwared = useForwardProps(props)

watch(
  [effectiveSwiper, scrollRef],
  ([swiper, el]) => {
    if (swiper && hasModule('Scrollbar') && el) {
      const options = merge(
        {},
        typeof swiper.params.scrollbar === 'boolean'
          ? {}
          : swiper.params.scrollbar,
        forwared.value,
        { enabled: true, el },
      )
      swiper.params.scrollbar = options
      swiper.scrollbar.destroy()
      swiper.scrollbar.init()
      swiper.scrollbar.updateSize()
      swiper.scrollbar.setTranslate()

      return () => swiper.scrollbar?.destroy()
    }
  },
  { immediate: true },
)

useRegistSwiperEmits({
  swiperRef: effectiveSwiper,
  emit,
  events: ['scrollbarDragEnd', 'scrollbarDragMove', 'scrollbarDragStart'],
})
</script>

<template>
  <div
    ref="scrollbar"
    role="scrollbar-container"
    :class="twMerge('rui-swiper-scrollbar', propsClass)"
    data-scope="swiper"
    data-part="scrollbar"
  />
</template>
