import type { DirectiveBinding, ObjectDirective } from 'vue'
import { computePosition, flip, hide, offset, shift } from '@floating-ui/vue'

const bindingMap = new WeakMap<HTMLElement, DirectiveBinding>()

class TitleTooltip {
  titleTipNode: HTMLDivElement
  titleTipTextNode: Text
  showTimer: number = 0
  /** 延迟展示尚未触发时，当前排队的宿主（用于在卸载/切换时只取消自己） */
  pendingForEl: Element | null = null
  /** 浮层已显示时，与之对应的宿主 */
  activeEl: Element | null = null
  private io: IntersectionObserver | null = null
  /** 使过时异步路径（如 computePosition 返回后）不更新浮层 */
  private token: number = 0

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

  private stopTrackingVisibility() {
    this.io?.disconnect()
    this.io = null
  }

  private clearPendingFor(el: Element) {
    if (this.pendingForEl === el) {
      this.pendingForEl = null
    }
  }

  private trackVisibilityFor(el: Element) {
    this.stopTrackingVisibility()
    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && !entry.isIntersecting) {
          this.onMouseLeave()
        }
      },
      { root: null, rootMargin: '0px', threshold: 0 },
    )
    this.io.observe(el)
  }

  async onMouseEnter(el: Element, binding: DirectiveBinding) {
    const t = ++this.token
    if (this.showTimer) {
      clearTimeout(this.showTimer)
      this.showTimer = 0
    }
    this.pendingForEl = el
    this.showTimer = setTimeout(async () => {
      this.showTimer = 0
      try {
        if (t !== this.token) {
          return
        }
        if (!el.isConnected) {
          this.clearPendingFor(el)
          return
        }
        const cur = bindingMap.get(el as HTMLElement) ?? binding
        if (!cur.value) {
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
        if (t !== this.token) {
          this.clearPendingFor(el)
          return
        }
        if (!el.isConnected) {
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
        this.clearPendingFor(el)
        console.error(error)
      }
    }, 500) as unknown as number
  }

  onMouseLeave() {
    this.token++
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
    if (this.pendingForEl === el) {
      if (this.showTimer) {
        clearTimeout(this.showTimer)
        this.showTimer = 0
      }
      this.pendingForEl = null
      this.token++
    }
    if (this.activeEl === el) {
      this.onMouseLeave()
    }
  }
}

let instance: TitleTooltip | undefined
if (typeof window !== 'undefined') {
  instance = new TitleTooltip()
}

function onVTitleEnter(this: HTMLElement) {
  if (!instance) {
    return
  }
  const b = bindingMap.get(this)
  if (b) {
    void instance.onMouseEnter(this, b)
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
