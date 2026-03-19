import type { VueLazyloadOptions } from './source/types/lazyload'

export interface VueLazyloadOptionsEx extends VueLazyloadOptions {
  // 延迟加载(ms)
  loadingDelay?: number
  // 是否开启缓存
  useCache?: boolean
}
