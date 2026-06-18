import type { DirectiveBinding, VNode } from 'vue'
import type ReactiveListener from './source/listener'
import type { VueLazyloadOptionsEx } from './types'
import { isArray, merge } from 'es-toolkit/compat'
import { nextTick } from 'vue'
import ReactiveListenerEx from './listener'
import Lazy from './source/lazy'
import { getBestSelectionFromSrcset, inBrowser, scrollParent } from './source/util'
import { isCssGradientBackgroundValue } from './utils'

type TeventType = 'loading' | 'loaded' | 'error'

function applyLazyBackground(el: HTMLElement, bindType: string, src: string | null | undefined) {
  if (!src?.trim()) {
    el.style.backgroundColor = 'transparent'
    // @ts-expect-error CSSStyleDeclaration index
    el.style[bindType] = ''
    return
  }
  if (isCssGradientBackgroundValue(src)) {
    // @ts-expect-error CSSStyleDeclaration index
    el.style[bindType] = src
  }
  else {
    // @ts-expect-error CSSStyleDeclaration index
    el.style[bindType] = `url("${src}")`
  }
}

class LazyEx extends Lazy {
  loadingDelayTimers = new Map<HTMLElement, ReturnType<typeof setTimeout>>()

  constructor(options: VueLazyloadOptionsEx) {
    super(options)
    this.options = merge({}, this.options, { useCache: true, loadingDelay: 0 }, options)
    this._boundElRenderer = this._elRenderer.bind(this)
  }

  _clearLoadingDelayTimer(el: HTMLElement) {
    const timer = this.loadingDelayTimers.get(el)
    if (timer != null) {
      clearTimeout(timer)
      this.loadingDelayTimers.delete(el)
    }
  }

  _scheduleLoadingDelay(el: HTMLElement, callback: () => void) {
    this._clearLoadingDelayTimer(el)
    const delay = (this.options as VueLazyloadOptionsEx).loadingDelay
    if (!delay) {
      callback()
      return
    }
    const timer = setTimeout(() => {
      this.loadingDelayTimers.delete(el)
      if (!el.isConnected)
        return
      callback()
    }, delay)
    this.loadingDelayTimers.set(el, timer)
  }

  add(el: HTMLElement, binding: DirectiveBinding, _: VNode) {
    if (this.ListenerQueue.some(item => item.el === el)) {
      this.update(el, binding)
      return nextTick(this.lazyLoadHandler)
    }

    let { src, loading, error, cors } = this._valueFormatter(binding.value)

    this._pendingAdds.add(el)
    nextTick(() => {
      if (!this._pendingAdds.has(el))
        return
      this._pendingAdds.delete(el)

      if (!el.isConnected)
        return

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
        this._boundElRenderer,
        this._imageCache,
      )

      this.ListenerQueue.push(newListener)
      this._elRegistry?.register(el, newListener, el)

      if (inBrowser) {
        this._addListenerTarget(window)
        this._addListenerTarget($parent)
      }

      nextTick(this.lazyLoadHandler)
    })
  }

  _elRenderer(listener: ReactiveListener, state: TeventType, cache: boolean) {
    const listenerEx = listener as ReactiveListenerEx
    if (!listenerEx.el || listenerEx.destroyed || !listenerEx.el.isConnected)
      return
    const { el, bindType } = listenerEx

    let src
    let srcIndex = 'src'

    switch (state) {
      case 'loading':
        src = listenerEx.loading
        break
      case 'error':
        src = listenerEx.error
        break
      case 'loaded':
      default:
        if (isArray(listenerEx.src)) {
          src = listenerEx.src[listenerEx.renderIndex]
          srcIndex += listenerEx.renderIndex
        }
        else {
          src = listenerEx.src
        }
        break
    }

    if (
      bindType === 'background'
      || bindType === 'backgroundImage'
      || bindType === 'background-image'
    ) {
      if (state === 'loading' && !src?.trim()) {
        el.style.backgroundColor = 'transparent'
        // @ts-expect-error CSSStyleDeclaration index
        el.style[bindType] = ''
      }
      else if (state === 'loading') {
        applyLazyBackground(el, bindType, src)
      }
      else {
        this._scheduleLoadingDelay(el, () => {
          applyLazyBackground(el, bindType, src)
          if (srcIndex !== 'src') {
            el.setAttribute('src-index', srcIndex)
          }
        })
      }
    }
    else if (bindType === 'xlink:href' || bindType === 'href') {
      const attrSrc = src ?? ''
      this._scheduleLoadingDelay(el, () => {
        el.setAttribute(bindType, attrSrc)
      })
    }
    else if (el.getAttribute('src') !== (src ?? '')) {
      const imgSrc = src ?? ''
      this._scheduleLoadingDelay(el, () => {
        el.setAttribute('src', imgSrc)
      })
    }

    el.setAttribute('lazy', state)
    el.setAttribute('src-size', `${listenerEx.naturalWidth}x${listenerEx.naturalHeight}`)

    this.$emit(state, listenerEx, cache)
    this.options.adapter[state] && this.options.adapter[state](listenerEx, this.options)

    if (this.options.dispatchEvent) {
      const event = new CustomEvent(state, {
        detail: listenerEx,
      })
      el.dispatchEvent(event)
    }
  }

  remove(el: HTMLElement) {
    this._clearLoadingDelayTimer(el)
    super.remove(el)
    this._purgeDetachedListeners()
  }

  _releaseListeners(listeners: Array<any>) {
    // Clear loading delay timers before base class destroys the listeners
    listeners.forEach((item) => {
      if (item.el) {
        this._clearLoadingDelayTimer(item.el)
      }
    })
    super._releaseListeners(listeners)
  }
}

export default LazyEx
