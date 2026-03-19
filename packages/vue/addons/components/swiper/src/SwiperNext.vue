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
const { isCanNext } = useSwiperToggleEnabled(effectiveSwiper)

function onClick() {
  isCanNext.value && effectiveSwiper.value?.slideNext()
}
</script>

<template>
  <div
    class="rui-swiper-next"
    :data-disabled="isCanNext ? undefined : ''"
    data-scope="swiper"
    data-part="next"
    @click="onClick"
  >
    <slot
      v-bind="{
        disabled: !isCanNext,
      }"
    />
  </div>
</template>
