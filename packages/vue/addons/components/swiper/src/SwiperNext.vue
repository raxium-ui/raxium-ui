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
  isCanNext.value && effectiveSwiper.value?.slideNext()
}
</script>

<template>
  <Primitive
    :as-child="asChild"
    :as="as"
    class="rui-swiper-next"
    :data-disabled="isCanNext ? undefined : ''"
    data-scope="swiper"
    data-part="next"
    @click="onClick"
  >
    <slot
      v-bind="{
        disabled: !isCanNext,
        canPrev: isCanPrev,
        canNext: isCanNext,
      }"
    />
  </Primitive>
</template>
