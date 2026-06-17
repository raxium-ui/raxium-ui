import type { Swiper } from 'swiper/types'
import type { ComputedRef, MaybeRef, Ref, ShallowRef } from 'vue'
import type { SwiperEmits } from '.'
import { onActivated, onBeforeUnmount, onDeactivated, ref, unref, watchEffect } from 'vue'

type MaybeEmptySwiper = Swiper | null | undefined

const MODULE_PROPERTY_MAP: Record<string, keyof Swiper> = {
  Pagination: 'pagination',
  Navigation: 'navigation',
  Autoplay: 'autoplay',
  Keyboard: 'keyboard',
  Scrollbar: 'scrollbar',
}

export function useSwiperModule(
  swiper: MaybeRef<MaybeEmptySwiper> | ComputedRef<MaybeEmptySwiper>,
) {
  function hasModule(moduleName: string) {
    const _swiper = unref(swiper)
    if (!_swiper)
      return false
    const prop = MODULE_PROPERTY_MAP[moduleName]
    if (!prop)
      return false
    return prop in _swiper && _swiper[prop] != null
  }
  return { hasModule }
}

export function useSwiperToggleEnabled(swiperRef: Ref<MaybeEmptySwiper>) {
  const isCanPrev = ref(false)
  const isCanNext = ref(false)

  watchEffect((cleanup) => {
    const swiper = unref(swiperRef)
    if (!swiper)
      return
    if (swiper.params?.loop || swiper.params?.rewind) {
      isCanPrev.value = true
      isCanNext.value = true
      return
    }
    const onSlideChange = () => {
      isCanPrev.value = !swiper.isBeginning
      isCanNext.value = !swiper.isEnd
    }
    isCanPrev.value = !swiper.isBeginning
    isCanNext.value = !swiper.isEnd
    swiper.on('slideChange', onSlideChange)
    cleanup(() => {
      swiper.off('slideChange', onSlideChange)
    })
  })

  return { isCanPrev, isCanNext }
}

/**
 * Keep-Alive lifecycle: destroy Swiper on deactivate and rebuild on activate
 * to avoid detached DOM references and background autoplay timers.
 */
export function useSwiperKeepAlive({
  swiperInstance,
  swiperEl,
  hasModule,
}: {
  swiperInstance: ShallowRef<MaybeEmptySwiper>
  swiperEl: Ref<HTMLElement | undefined>
  hasModule: (moduleName: string) => boolean
}) {
  const isAlive = ref(true)

  function destroySwiper() {
    const swiper = swiperInstance.value
    if (!swiper)
      return

    if (hasModule('Autoplay'))
      swiper.autoplay?.stop()

    swiper.destroy(true, true)
    swiperInstance.value = null
    swiperEl.value = undefined
  }

  onDeactivated(() => {
    destroySwiper()
    isAlive.value = false
  })

  onActivated(() => {
    isAlive.value = true
  })

  onBeforeUnmount(() => {
    destroySwiper()
  })

  return { isAlive, destroySwiper }
}

export function useRegistSwiperEmits({
  swiperRef,
  emit,
  events = [],
}: {
  swiperRef: Ref<MaybeEmptySwiper>
  emit: (...args: any[]) => any
  events: Array<keyof SwiperEmits>
}) {
  if (!swiperRef.value || !events.length)
    return
  watchEffect((cleanup) => {
    const listeners = events.map((key) => {
      return [
        key,
        (...args: any) => {
          emit(key, ...(args as any))
        },
      ]
    })
    listeners.forEach(([key, listener]) => {
      swiperRef.value?.on(key as any, listener as any)
    })
    cleanup(() => {
      listeners.forEach(([key, listener]) => {
        swiperRef.value?.off(key as any, listener as any)
      })
    })
  })
}
