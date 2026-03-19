import type {
  NavigationOptions,
  PaginationOptions,
  ScrollbarOptions,
  Swiper,
  SwiperEvents,
  SwiperOptions,
} from 'swiper/types'
import type { ClassNameValue } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'

export type { Swiper, SwiperEvents, SwiperOptions } from 'swiper/types'
export interface SwiperExpose {
  swiper: Swiper | undefined
  $el: HTMLElement | undefined
}

export interface SwiperProps extends SwiperOptions {
  /**
   * 自定义容器标签名
   * @default 'div'
   */
  tag?: string
  /**
   * 自定义 wrapper 标签名
   * @default 'div'
   */
  wrapperTag?: string
  /**
   * 使用的模块数组
   */
  modules?: any[]
  class?: HTMLAttributes['class']
}

export interface SwiperEmits extends SwiperEvents {
  swiper: (swiper: Swiper) => void
}

export interface SwiperSlots {
  'default': () => any
  'container-start': () => any
  'container-end': () => any
  'wrapper-start': () => any
  'wrapper-end': () => any
}

export interface SwiperNavigationProps
  extends Omit<NavigationOptions, 'enabled' | 'nextEl' | 'prevEl'> {
  class?: ClassNameValue
  swiper?: Swiper
}

export interface SwiperPaginationProps extends Omit<PaginationOptions, 'type' | 'enabled' | 'el'> {
  type: PaginationOptions['type'] | 'autoplay-bullets'
  class?: ClassNameValue
  swiper?: Swiper
}

export interface SwiperScrollbarProps extends Omit<ScrollbarOptions, 'enabled' | 'el'> {
  class?: ClassNameValue
  swiper?: Swiper
}
