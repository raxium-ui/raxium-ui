import type { DirectiveBinding, VNode } from 'vue'
import type Lazy from './lazy'
import { merge } from 'es-toolkit/compat'
import { remove } from './util'

export default class LazyContainerMananger {
  lazy: Lazy
  _queue: Array<LazyContainer>
  constructor(lazy: Lazy) {
    this.lazy = lazy
    lazy.lazyContainerMananger = this
    this._queue = []
  }

  bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const container = new LazyContainer(el, binding, vnode, this.lazy)
    this._queue.push(container)
  }

  update(el: HTMLElement, binding: DirectiveBinding) {
    const container = this._queue.find(item => item.el === el)
    if (!container)
      return
    container.update(el, binding)
  }

  unbind(el: HTMLElement) {
    const container = this._queue.find(item => item.el === el)
    if (!container)
      return
    container.clear()
    remove(this._queue, container)
  }
}

const defaultOptions = {
  selector: 'img',
  error: '',
  loading: '',
}

type DefaultOptions = {
  selector: keyof HTMLElementTagNameMap
  error: ''
  loading: ''
}

class LazyContainer {
  el: HTMLElement | null
  _queue: Array<LazyContainer>
  options: DefaultOptions
  lazy: Lazy | null
  binding: DirectiveBinding | null
  vnode: VNode | null
  /**
   * Track previously bound imgs so `update()` can diff and call
   * `lazy.remove(el)` for imgs that left the container subtree. Without
   * this, removed imgs linger in `Lazy.ListenerQueue` until a scroll/resize
   * event triggers `_purgeDetachedListeners` — a soft leak on static pages.
   */
  private _boundImgs: Set<HTMLElement> = new Set()
  constructor(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, lazy: Lazy) {
    this.el = el
    this.vnode = vnode
    this.binding = binding
    this.options = {} as DefaultOptions
    this.lazy = lazy

    this._queue = []
    this.update(el, binding)
  }

  update(el: HTMLElement, binding: DirectiveBinding) {
    this.el = el
    this.options = merge({}, defaultOptions, binding.value)

    const imgs = this.getImgs()
    const nextBound = new Set<HTMLElement>(imgs)

    // Remove imgs that were previously bound but are no longer in the container
    this._boundImgs.forEach((prev) => {
      if (!nextBound.has(prev)) {
        this.lazy!.remove(prev)
      }
    })

    imgs.forEach((el: HTMLElement) => {
      this.lazy!.add(
        el,
        merge({}, this.binding, {
          value: {
            src: el.getAttribute('data-src') || el.dataset.src,
            error: el.getAttribute('data-error') || el.dataset.error || this.options.error,
            loading: el.getAttribute('data-loading') || el.dataset.loading || this.options.loading,
          },
        }),
        this.vnode as VNode,
      )
    })

    this._boundImgs = nextBound
  }

  getImgs(): Array<HTMLElement> {
    return Array.from(this.el!.querySelectorAll(this.options.selector))
  }

  clear() {
    // Prefer the tracked set over a fresh querySelectorAll: imgs already
    // detached from the container won't be found by the selector, yet they
    // still hold entries in Lazy.ListenerQueue and must be removed.
    const toRemove = this._boundImgs.size > 0 ? Array.from(this._boundImgs) : this.getImgs()
    toRemove.forEach(el => this.lazy!.remove(el))
    this._boundImgs.clear()

    this.vnode = null
    this.binding = null
    this.lazy = null
  }
}
