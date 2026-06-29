import type { App, Directive, Plugin } from 'vue'
import type Lazy from './source/lazy'
import type { VueLazyloadOptionsEx } from './types'
import LazyEx from './lazy'
import LazyComponent from './source/lazy-component'
import LazyContainer from './source/lazy-container'
import LazyImage from './source/lazy-image'

const plugin: Plugin<[options?: VueLazyloadOptionsEx]> = {
  /*
   * install function
   * @param  {Vue} Vue
   * @param  {object} options lazyload options
   */
  install(app: App, options: VueLazyloadOptionsEx = {}) {
    const lazy = new LazyEx(options)
    const lazyContainer = new LazyContainer(lazy as Lazy)

    const vueVersion = Number(app.version.split('.')[0])
    if (vueVersion < 3)
      return new Error('Vue version at least 3.0')

    app.config.globalProperties.$Lazyload = lazy

    app.provide('Lazyload', lazy)

    if (options.lazyComponent) {
      app.component('lazy-component', LazyComponent(lazy as Lazy))
    }

    if (options.lazyImage) {
      app.component('lazy-image', LazyImage(lazy as Lazy))
    }

    app.directive('lazy', {
      beforeMount: lazy.add.bind(lazy),
      beforeUpdate: lazy.update.bind(lazy),
      updated: lazy.lazyLoadHandler.bind(lazy),
      unmounted: lazy.remove.bind(lazy),
    })
    app.directive('lazy-container', {
      beforeMount: lazyContainer.bind.bind(lazyContainer),
      updated: lazyContainer.update.bind(lazyContainer),
      unmounted: lazyContainer.unbind.bind(lazyContainer),
    })
  },
}
export { plugin }

/**
 * Create a fresh `v-lazy` directive backed by an isolated `LazyEx` instance.
 *
 * Useful when consumers need lifecycle control (SSR, tests, multi-tenant
 * apps, micro-frontends) or want non-default options without going through
 * the `plugin` install path.
 *
 * The returned `directive` and `lazy` share state; call `lazy` methods
 * directly (e.g. `lazy.lazyLoadHandler()`) for advanced use.
 */
export function createVLazy(options: VueLazyloadOptionsEx = {}): {
  directive: Directive
  lazy: LazyEx
} {
  const lazy = new LazyEx(options)
  const directive: Directive = {
    beforeMount: lazy.add.bind(lazy),
    beforeUpdate: lazy.update.bind(lazy),
    updated: lazy.lazyLoadHandler.bind(lazy),
    unmounted: lazy.remove.bind(lazy),
  }
  return { directive, lazy }
}

/**
 * Module-level singleton `v-lazy` directive.
 *
 * ⚠️ Lifecycle caveat: this `LazyEx` instance is created at module load and
 * lives for the lifetime of the JS context. Its `ListenerQueue`,
 * `TargetQueue`, image cache, IntersectionObserver and FinalizationRegistry
 * are reused across the entire app and never disposed.
 *
 * Normal Vue `unmounted` hooks keep things balanced, but for SSR, isolated
 * tests, HMR-prone setups, or apps that need a dedicated configuration
 * (e.g. `observer: true`), prefer {@link createVLazy} to obtain an isolated
 * instance you can control.
 */
const { directive: vLazy } = createVLazy({})
export { vLazy }
