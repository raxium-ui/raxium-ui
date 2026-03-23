<script setup lang="ts">
import type { NavigationEvents } from 'swiper/types'
import type { SwiperNavigationProps } from '.'
import { cn, useForwardProps } from '@raxium/vue-addons-shared'
import { merge } from 'es-toolkit/compat'
import { ChevronLeft } from 'lucide-vue-next'
import { useSwiper } from 'swiper/vue'
import { computed, useTemplateRef, watch } from 'vue'
import { useRegistSwiperEmits, useSwiperModule, useSwiperToggleEnabled } from './utils'

const { class: propsClass, swiper, ...props } = defineProps<SwiperNavigationProps>()
const emit = defineEmits<NavigationEvents>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { hasModule } = useSwiperModule(effectiveSwiper)
const { isCanPrev } = useSwiperToggleEnabled(effectiveSwiper)
const navRef = useTemplateRef('navigation')

const forwared = useForwardProps(props)

useRegistSwiperEmits({
  swiperRef: effectiveSwiper,
  emit,
  events: ['navigationHide', 'navigationPrev', 'navigationShow'],
})

watch(forwared, () => {
  if (!effectiveSwiper.value?.navigation)
    return
  effectiveSwiper.value.params.navigation = merge(
    {},
    effectiveSwiper.value.params.navigation,
    forwared.value,
  )
  effectiveSwiper.value.navigation.update()
})

watch(
  [effectiveSwiper, navRef],
  ([swiper, el]) => {
    if (swiper && hasModule('Navigation') && el) {
      const options = merge(
        {},
        typeof swiper.params.navigation === 'boolean'
          ? {}
          : swiper.params.navigation,
        forwared.value,
        { enabled: true, prevEl: el },
      )
      swiper.params.navigation = options
      swiper.navigation.destroy()
      swiper.navigation.init()
      swiper.navigation.update()

      return () => swiper.navigation?.destroy()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    ref="navigation"
    :class="cn('rui-swiper-navigation_prev', propsClass)"
    :data-disabled="isCanPrev ? undefined : ''"
    data-scope="swiper"
    data-part="navigation-prev"
  >
    <slot v-bind="{ disabled: !isCanPrev }">
      <ChevronLeft />
    </slot>
  </div>
</template>
