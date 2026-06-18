import type { DirectiveBinding, ObjectDirective } from 'vue'
import { computePosition, flip, hide, offset, shift } from '@floating-ui/vue'

const bindingMap = new WeakMap<HTMLElement, DirectiveBinding>()

class TitleTooltip {
  titleTipNode: HTMLDivElement
  titleTipTextNode: Text
  showTimer: number = 0
  private io: IntersectionObserver | null = null
  /** 使过时异步路径（如 computePosition 返回后）不更新浮层 */
  private token: number = 0
  private showAbortController: AbortController | null = null

  /** WeakRef wrappers — allow GC to reclaim detached host elements */
  private _pendingRef: WeakRef<Element> | null = null
  private _activeRef: WeakRef<Element> | null = null

  get pendingForEl(): Element | null {
    const el = this._pendingRef?.deref() ?? null
    if (el && !el.isConnected) {
      this._pendingRef = null
      return null
    }
    return el
  }

  set pendingForEl(el: Element | null) {
    this._pendingRef = el ? new WeakRef(el) : null
  }

  get activeEl(): Element | null {
    const el = this._activeRef?.deref() ?? null
    if (el && !el.isConnected) {
      this._activeRef = null
      return null
    }
    return el
  }

  set activeEl(el: Element | null) {
    this._activeRef = el ? new WeakRef(el) : null
  }

  constructor() {
    this.titleTipNode = document.createElement('div')
    this.titleTipNode.className = 'rui-v-title'
    this.titleTipTextNode = document.createTextNode('')
    this.titleTipNode.appendChild(this.titleTipTextNode)
    document.body.appendChild(this.titleTipNode)
    document.addEventListener('scroll', () => {
      if (this.showTimer || this.activeEl || this.pendingForEl) {
        this.onMouseLeave()
      }
    })
  }

  private abortShowCycle() {
    this.showAbortController?.abort()
    this.showAbortController = null
  }

  private assertHostConnected(el: Element): boolean {
    return el.isConnected
  }

  private stopTrackingVisibility() {
    this.io?.disconnect()
    this.io = null
  }

  private clearPendingFor(el: Element) {
    if (this._pendingRef?.deref() === el) {
      this._pendingRef = null
    }
  }

  private trackVisibilityFor(el: Element) {
    this.stopTrackingVisibility()
    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry)
          return
        if (!entry.target.isConnected) {
          this.onMouseLeave()
          return
        }
        if (!entry.isIntersecting) {
          this.onMouseLeave()
        }
      },
      { root: null, rootMargin: '0px', threshold: 0 },
    )
    this.io.observe(el)
  }

  async onMouseEnter(el: Element) {
    this.abortShowCycle()
    const t = ++this.token
    const abortController = new AbortController()
    this.showAbortController = abortController
    const { signal } = abortController

    if (this.showTimer) {
      clearTimeout(this.showTimer)
      this.showTimer = 0
    }
    // Clear previous active element to release its DOM reference immediately
    if (this.activeEl && this.activeEl !== el) {
      this.stopTrackingVisibility()
      this.activeEl = null
      this.titleTipNode.style.visibility = 'hidden'
      this.titleTipNode.style.display = 'none'
    }
    this.pendingForEl = el
    this.showTimer = setTimeout(async () => {
      this.showTimer = 0
      try {
        if (signal.aborted || t !== this.token) {
          return
        }
        if (!this.assertHostConnected(el)) {
          this.clearPendingFor(el)
          return
        }
        const cur = bindingMap.get(el as HTMLElement)
        if (!cur?.value) {
          this.clearPendingFor(el)
          this.titleTipNode.style.visibility = 'hidden'
          this.titleTipNode.style.display = 'block'
          return
        }
        this.titleTipNode.removeChild(this.titleTipTextNode)
        this.titleTipTextNode = document.createTextNode(cur.value as string)
        this.titleTipNode.appendChild(this.titleTipTextNode)
        this.titleTipNode.setAttribute('data-theme-surface', cur.arg ?? 'default')
        this.titleTipNode.setAttribute('data-size', cur.modifiers.lg ? 'lg' : 'base')
        this.titleTipNode.style.visibility = 'hidden'
        this.titleTipNode.style.display = 'block'

        const { x, y, middlewareData } = await computePosition(el, this.titleTipNode, {
          placement: 'bottom',
          middleware: [flip(), shift(), offset(4), hide()],
        })
        if (signal.aborted || t !== this.token) {
          this.clearPendingFor(el)
          return
        }
        if (!this.assertHostConnected(el)) {
          this.onMouseLeave()
          return
        }
        if (!middlewareData.hide?.referenceHidden) {
          Object.assign(this.titleTipNode.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
          this.titleTipNode.style.visibility = 'visible'
          this.titleTipNode.style.display = 'block'
          this.activeEl = el
          this.clearPendingFor(el)
          this.trackVisibilityFor(el)
        }
        else {
          this.clearPendingFor(el)
          this.titleTipNode.style.visibility = 'visible'
          this.titleTipNode.style.display = 'none'
        }
      }
      catch (error) {
        if (!signal.aborted) {
          this.clearPendingFor(el)
          console.error(error)
        }
      }
    }, 500) as unknown as number
  }

  onMouseLeave() {
    this.token++
    this.abortShowCycle()
    if (this.showTimer) {
      clearTimeout(this.showTimer)
      this.showTimer = 0
    }
    this.pendingForEl = null
    this.stopTrackingVisibility()
    this.activeEl = null
    this.titleTipNode.style.visibility = 'hidden'
    this.titleTipNode.style.display = 'none'
  }

  /** 宿主从 DOM 移除等场景：不干扰其它元素上的排队/显示 */
  dismissForReference(el: Element) {
    const isPending = this._pendingRef?.deref() === el
    const isActive = this._activeRef?.deref() === el

    if (isPending) {
      if (this.showTimer) {
        clearTimeout(this.showTimer)
        this.showTimer = 0
      }
      this._pendingRef = null
      this.token++
      this.abortShowCycle()
    }

    if (isActive) {
      this.onMouseLeave()
    }
  }
}

let instance: TitleTooltip | undefined
if (typeof window !== 'undefined') {
  instance = new TitleTooltip()
}

// eslint-disable-next-line jsdoc/empty-tags
/** @internal For unit tests only */
export function __getTitleTooltipForTest() {
  return instance
}

function onVTitleEnter(this: HTMLElement) {
  if (!instance) {
    return
  }
  if (bindingMap.get(this)) {
    void instance.onMouseEnter(this)
  }
}

function onVTitleLeave(this: HTMLElement) {
  instance?.onMouseLeave()
}

export const vTitle: ObjectDirective<HTMLElement, string> = {
  mounted(el, binding) {
    if (typeof window === 'undefined' || !instance) {
      return
    }
    bindingMap.set(el, binding)
    el.addEventListener('mouseenter', onVTitleEnter)
    el.addEventListener('mouseleave', onVTitleLeave)
  },
  updated(el, binding) {
    bindingMap.set(el, binding)
  },
  unmounted(el) {
    bindingMap.delete(el)
    if (typeof window === 'undefined' || !instance) {
      return
    }
    el.removeEventListener('mouseenter', onVTitleEnter)
    el.removeEventListener('mouseleave', onVTitleLeave)
    instance.dismissForReference(el)
  },
}
