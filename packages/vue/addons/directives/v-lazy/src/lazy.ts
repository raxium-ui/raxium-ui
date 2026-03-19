import type { DirectiveBinding, VNode } from 'vue'
import type { VueLazyloadOptionsEx } from './types'
import { isArray, merge } from 'es-toolkit/compat'
import { nextTick } from 'vue'
import ReactiveListenerEx from './listener'
import Lazy from './source/lazy'
import { getBestSelectionFromSrcset, inBrowser, scrollParent } from './source/util'

type TeventType = 'loading' | 'loaded' | 'error'

class LazyEx extends Lazy {
  loadingDelayTimer: ReturnType<typeof setTimeout> | null = null

  constructor(options: VueLazyloadOptionsEx) {
    super(options)
    this.options = merge({}, this.options, { useCache: true, loadingDelay: 0 }, options)
  }

  add(el: HTMLElement, binding: DirectiveBinding, _: VNode) {
    if (this.ListenerQueue.some(item => item.el === el)) {
      this.update(el, binding)
      return nextTick(this.lazyLoadHandler)
    }

    let { src, loading, error, cors } = this._valueFormatter(binding.value)

    nextTick(() => {
      src = getBestSelectionFromSrcset(el, this.options.scale as number) || src
      this._observer && this._observer.observe(el)

      const container: string = Object.keys(binding.modifiers)[0]

      let $parent: any

      if (container) {
        $parent = binding.instance!.$refs[container]
        // if there is container passed in, try ref first, then fallback to getElementById to support the original usage
        $parent = $parent ? $parent.el || $parent : document.getElementById(container)
      }

      if (!$parent) {
        $parent = scrollParent(el)
      }
      const noCache = el.hasAttribute('no-cache')
      const newListener = new ReactiveListenerEx(
        el,
        src,
        error!,
        loading!,
        binding.arg ?? 'src',
        $parent,
        merge({}, this.options, { useCache: !noCache }),
        cors!,
        this._elRenderer.bind(this),
        this._imageCache,
      )

      this.ListenerQueue.push(newListener)

      if (inBrowser) {
        this._addListenerTarget(window)
        this._addListenerTarget($parent)
      }

      nextTick(this.lazyLoadHandler)
    })
  }

  _elRenderer(listener: ReactiveListenerEx, state: TeventType, cache: boolean) {
    if (!listener.el)
      return
    const { el, bindType } = listener

    let src
    let srcIndex = 'src'

    switch (state) {
      case 'loading':
        src = listener.loading
        break
      case 'error':
        src = listener.error
        break
      case 'loaded':
      default:
        if (isArray(listener.src)) {
          src = listener.src[listener.renderIndex]
          srcIndex += listener.renderIndex
        }
        else {
          src = listener.src
        }
        break
    }

    if (
      bindType === 'background'
      || bindType === 'backgroundImage'
      || bindType === 'background-image'
    ) {
      if (state === 'loading' && !src) {
        el.style.backgroundColor = 'transparent'
      }
      else if (state === 'loading') {
        if (src.includes('gradient')) {
          // @ts-expect-error style is not indexable
          el.style[bindType] = src
        }
        else {
          // @ts-expect-error style is not indexable
          el.style[bindType] = `url("${src}")`
        }
      }
      else {
        if ((this.options as VueLazyloadOptionsEx).loadingDelay) {
          this.loadingDelayTimer = setTimeout(() => {
            if (src.includes('gradient')) {
              // @ts-expect-error style is not indexable
              el.style[bindType] = src
            }
            else {
              // @ts-expect-error style is not indexable
              el.style[bindType] = `url("${src}")`
            }
            if (srcIndex !== 'src') {
              el.setAttribute('src-index', srcIndex)
            }
          }, (this.options as VueLazyloadOptionsEx).loadingDelay)
        }
        else {
          if (src.includes('gradient')) {
            // @ts-expect-error style is not indexable
            el.style[bindType] = src
          }
          else {
            // @ts-expect-error style is not indexable
            el.style[bindType] = `url("${src}")`
          }
          if (srcIndex !== 'src') {
            el.setAttribute('src-index', srcIndex)
          }
        }
      }
    }
    else if (bindType === 'xlink:href' || bindType === 'href') {
      if ((this.options as VueLazyloadOptionsEx).loadingDelay) {
        this.loadingDelayTimer = setTimeout(() => {
          el.setAttribute(bindType, src)
        }, (this.options as VueLazyloadOptionsEx).loadingDelay)
      }
      else {
        el.setAttribute(bindType, src)
      }
    }
    else if (el.getAttribute('src') !== src) {
      if ((this.options as VueLazyloadOptionsEx).loadingDelay) {
        this.loadingDelayTimer = setTimeout(() => {
          el.setAttribute('src', src)
        }, (this.options as VueLazyloadOptionsEx).loadingDelay)
      }
      else {
        el.setAttribute('src', src)
      }
    }

    el.setAttribute('lazy', state)
    el.setAttribute('src-size', `${listener.naturalWidth}x${listener.naturalHeight}`)

    this.$emit(state, listener, cache)
    this.options.adapter[state] && this.options.adapter[state](listener, this.options)

    if (this.options.dispatchEvent) {
      const event = new CustomEvent(state, {
        detail: listener,
      })
      el.dispatchEvent(event)
    }
  }

  remove(el: HTMLElement) {
    this.loadingDelayTimer && clearTimeout(this.loadingDelayTimer)
    super.remove(el)
  }
}

export default LazyEx
