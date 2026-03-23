<script setup lang="ts">
import type { PaginationEvents, Swiper } from 'swiper/types'
import type { SwiperPaginationProps } from '.'
import { getNodeCssVar, rem2px } from '@raxium/shared'
import { cn, useForwardProps } from '@raxium/vue-addons-shared'
import { merge } from 'es-toolkit/compat'
import { useSwiper } from 'swiper/vue'
import { computed, nextTick, useTemplateRef, watch } from 'vue'
import { useRegistSwiperEmits, useSwiperModule } from './utils'

const { class: propsClass, swiper, ...props } = defineProps<SwiperPaginationProps>()
const emit = defineEmits<PaginationEvents>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { hasModule } = useSwiperModule(effectiveSwiper)
const pagiRef = useTemplateRef('pagination')
const forwared = useForwardProps(props)

watch(
  [effectiveSwiper, pagiRef],
  ([swiper, el]) => {
    if (!swiper || !hasModule('Pagination') || !el)
      return

    const cleanups: (() => void)[] = []

    if (forwared.value.type === 'autoplay-bullets' && hasModule('Autoplay')) {
      const onAutoplayTimeLeft = (_s: Swiper, _t: number, percentage: number) => {
        el.style.setProperty(
          '--autoplay-percentage',
          `${Math.max(0, Math.min(1, 1 - percentage)) * 100}%`,
        )
      }
      const onPaginationRender = () => {
        if (forwared.value.dynamicBullets) {
          const getMinBulletSize = (): number => {
            if (!el)
              return 0
            const bullets = swiper.pagination.bullets
            if (bullets.length === 0)
              return 0
            let minSize = Infinity
            bullets.forEach((bullet: Element) => {
              const style = window.getComputedStyle(bullet)
              const dir = swiper.params.direction
              if (dir === 'horizontal') {
                const width
                  = parseFloat(style.width)
                    + parseFloat(style.marginLeft)
                    + parseFloat(style.marginRight)
                if (width < minSize)
                  minSize = width
              }
              else if (dir === 'vertical') {
                const height
                  = parseFloat(style.height)
                    + parseFloat(style.marginTop)
                    + parseFloat(style.marginBottom)
                if (height < minSize)
                  minSize = height
              }
            })
            return minSize
          }
          const activeBulletSize = rem2px(
            getNodeCssVar(el, '---autoplay-active-bullet-size', '2.5rem'),
          )
          nextTick(() => {
            if (el) {
              el.style.width = `${
                getMinBulletSize() * (5 + (forwared.value.dynamicMainBullets ?? 1))
                + activeBulletSize
              }px`
            }
          })
        }
      }
      swiper.on('paginationRender', onPaginationRender)
      swiper.on('autoplayTimeLeft', onAutoplayTimeLeft)
      cleanups.push(() => {
        swiper.off('paginationRender', onPaginationRender)
        swiper.off('autoplayTimeLeft', onAutoplayTimeLeft)
      })
    }

    const options = merge(
      {},
      typeof swiper.params.pagination === 'boolean' ? {} : swiper.params.pagination,
      forwared.value,
      {
        enabled: true,
        el,
        type: forwared.value.type === 'autoplay-bullets' ? 'bullets' : forwared.value.type,
      },
    )
    swiper.params.pagination = options
    swiper.pagination.destroy()
    swiper.pagination.init()
    swiper.pagination.render()
    swiper.pagination.update()

    return () => {
      cleanups.forEach(fn => fn())
      swiper.pagination?.destroy()
    }
  },
  { immediate: true },
)

useRegistSwiperEmits({
  swiperRef: effectiveSwiper,
  emit,
  events: ['paginationHide', 'paginationRender', 'paginationShow', 'paginationUpdate'],
})
</script>

<template>
  <div
    ref="pagination"
    role="pagination-container"
    :class="cn('rui-swiper-pagination', propsClass)"
    :data-type="forwared.type"
    data-scope="swiper"
    data-part="pagination"
  />
</template>
