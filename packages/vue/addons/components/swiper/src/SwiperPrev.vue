<script setup lang="ts">
import type { PrimitiveProps } from '@raxium/vue-addons-shared'
import type { Swiper as SwiperInstance } from 'swiper/types'
import { Primitive } from '@raxium/vue-addons-shared'
import { useSwiper } from 'swiper/vue'
import { computed } from 'vue'
import { useSwiperToggleEnabled } from './utils'

const {
  asChild = false,
  as = 'div',
  swiper,
} = defineProps<PrimitiveProps & { swiper?: SwiperInstance }>()
defineSlots<{
  default: (props: { disabled: boolean }) => any
}>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { isCanPrev, isCanNext } = useSwiperToggleEnabled(effectiveSwiper)

function onClick() {
  isCanPrev.value && effectiveSwiper.value?.slidePrev()
}
</script>

<template>
  <Primitive
    :as-child="asChild"
    :as="as"
    class="rui-swiper-prev"
    :data-disabled="isCanPrev ? undefined : ''"
    data-scope="swiper"
    data-part="prev"
    @click="onClick"
  >
    <slot
      v-bind="{
        disabled: !isCanPrev,
        canPrev: isCanPrev,
        canNext: isCanNext,
      }"
    />
  </Primitive>
</template>
