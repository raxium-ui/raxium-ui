import type { VueLazyloadPluginObject } from './lazyload'
import './vue'

declare const VueLazyload: VueLazyloadPluginObject
export default VueLazyload

export {
  loadImageAsyncOption,
  VueLazyloadHandler,
  VueLazyloadOptions,
  VueReactiveListener,
} from './lazyload'
