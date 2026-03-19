<script setup lang="ts">
import type { Swiper as SwiperInstance } from 'swiper/types'
import { useSwiper } from 'swiper/vue'
import { computed } from 'vue'
import { useSwiperToggleEnabled } from './utils'

const { swiper } = defineProps<{ swiper?: SwiperInstance }>()
defineSlots<{
  default: (props: { disabled: boolean }) => any
}>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { isCanPrev } = useSwiperToggleEnabled(effectiveSwiper)

function onClick() {
  isCanPrev.value && effectiveSwiper.value?.slidePrev()
}
</script>

<template>
  <div
    class="w-fit"
    :data-disabled="isCanPrev ? undefined : ''"
    data-scope="swiper"
    data-part="prev"
    @click="onClick"
  >
    <slot
      v-bind="{
        disabled: !isCanPrev,
      }"
    />
  </div>
</template>
