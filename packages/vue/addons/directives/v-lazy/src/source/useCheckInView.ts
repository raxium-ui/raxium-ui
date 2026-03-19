import type { Ref } from 'vue'
import { reactive } from 'vue'
import { inBrowser } from './util'

export function useCheckInView(el: Ref, preLoad: number): {
  rect: DOMRect
  checkInView: () => boolean
} {
  let rect: DOMRect = reactive({} as DOMRect)
  const getRect = () => {
    rect = el.value.getBoundingClientRect()
  }
  const checkInView = () => {
    getRect()
    return inBrowser
      && (rect.top < window.innerHeight * preLoad && rect.bottom > 0)
      && (rect.left < window.innerWidth * preLoad && rect.right > 0)
  }
  return {
    rect,
    checkInView,
  }
}
