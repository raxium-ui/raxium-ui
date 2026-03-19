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

const dirLazy = new LazyEx({})
export const vLazy: Directive = {
  beforeMount: dirLazy.add.bind(dirLazy),
  beforeUpdate: dirLazy.update.bind(dirLazy),
  updated: dirLazy.lazyLoadHandler.bind(dirLazy),
  unmounted: dirLazy.remove.bind(dirLazy),
}
