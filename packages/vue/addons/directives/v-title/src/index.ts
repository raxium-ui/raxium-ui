import type { DirectiveBinding } from 'vue'
import { computePosition, flip, hide, offset, shift } from '@floating-ui/vue'

class TitleTooltip {
  titleTipNode: HTMLDivElement
  titleTipTextNode: Text
  showTimer: number = 0

  constructor() {
    this.titleTipNode = document.createElement('div')
    this.titleTipNode.className = 'rui-v-title'
    this.titleTipTextNode = document.createTextNode('')
    this.titleTipNode.appendChild(this.titleTipTextNode)
    document.body.appendChild(this.titleTipNode)
    document.addEventListener('scroll', () => {
      if (this.showTimer) {
        this.onMouseLeave()
      }
    })
  }

  async onMouseEnter(el: Element, binding: DirectiveBinding) {
    this.showTimer && clearTimeout(this.showTimer)
    this.showTimer = setTimeout(async () => {
      try {
        this.titleTipNode.removeChild(this.titleTipTextNode)
        this.titleTipTextNode = document.createTextNode(binding.value)
        this.titleTipNode.appendChild(this.titleTipTextNode)
        this.titleTipNode.setAttribute('data-theme-surface', binding.arg ?? 'default')
        this.titleTipNode.setAttribute('data-size', binding.modifiers.lg ? 'lg' : 'base')
        this.titleTipNode.style.visibility = 'hidden'
        this.titleTipNode.style.display = 'block'

        const { x, y, middlewareData } = await computePosition(el, this.titleTipNode, {
          placement: 'bottom',
          middleware: [flip(), shift(), offset(4), hide()],
        })
        if (!middlewareData.hide?.referenceHidden) {
          Object.assign(this.titleTipNode.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
          this.titleTipNode.style.visibility = 'visible'
          this.titleTipNode.style.display = 'block'
        }
        else {
          this.titleTipNode.style.visibility = 'visible'
          this.titleTipNode.style.display = 'none'
        }
      }
      catch (error) {
        console.error(error)
      }
    }, 500) as unknown as number
  }

  onMouseLeave() {
    if (this.showTimer) {
      clearTimeout(this.showTimer)
      this.showTimer = 0
    }
    this.titleTipNode.style.visibility = 'hidden'
    this.titleTipNode.style.display = 'none'
  }
}

let instance: TitleTooltip
if (window) {
  instance = new TitleTooltip()
}

export function vTitle(el: Element, binding: DirectiveBinding) {
  el.addEventListener('mouseenter', () => instance.onMouseEnter(el, binding))
  el.addEventListener('mouseleave', () => instance.onMouseLeave())
}
