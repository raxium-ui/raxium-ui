import type { Ref } from 'vue'

type Boundary = 'clippingAncestors' | Element | Array<Element>

/**
 * Creates an `updatePosition` callback for floating-ui positioning that clamps
 * the floating element within a boundary element along the cross-axis.
 *
 * This works around `@zag-js/popper` hardcoding `limitShift()` in the shift
 * middleware, which prevents the tooltip from shifting far enough to stay
 * within the boundary when the reference (e.g. thumb) is at the edge.
 *
 * Uses the CSS `translate` property (independent of `transform` used by the
 * positioner and `left`/`top` used by the arrow middleware) so that neither
 * autoUpdate cycles nor `shiftArrowMiddleware` can overwrite the adjustment.
 */
export function createBoundaryClamp(boundaryRef: Ref<Boundary>) {
  return async ({ updatePosition, floatingElement }: {
    updatePosition: () => Promise<void>
    floatingElement: HTMLElement | null
  }) => {
    await updatePosition()

    const boundary = boundaryRef.value
    if (!floatingElement || !boundary || typeof boundary === 'string') {
      return
    }

    const boundaryEl = Array.isArray(boundary) ? boundary[0] : boundary
    if (!boundaryEl)
      return

    const placement = floatingElement.getAttribute('data-placement') ?? 'top'
    const side = placement.split('-')[0]
    const isVerticalPlacement = side === 'top' || side === 'bottom'

    const bRect = boundaryEl.getBoundingClientRect()
    const fRect = floatingElement.getBoundingClientRect()
    const arrowEl = floatingElement.querySelector<HTMLElement>('[data-part=arrow]')

    if (isVerticalPlacement) {
      let diff = 0
      if (fRect.left < bRect.left) {
        diff = bRect.left - fRect.left
      }
      else if (fRect.right > bRect.right) {
        diff = -(fRect.right - bRect.right)
      }

      floatingElement.style.translate = diff !== 0 ? `${diff}px` : ''
      if (arrowEl) {
        arrowEl.style.translate = diff !== 0 ? `${-diff}px` : ''
      }
    }
    else {
      let diff = 0
      if (fRect.top < bRect.top) {
        diff = bRect.top - fRect.top
      }
      else if (fRect.bottom > bRect.bottom) {
        diff = -(fRect.bottom - bRect.bottom)
      }

      floatingElement.style.translate = diff !== 0 ? `0 ${diff}px` : ''
      if (arrowEl) {
        arrowEl.style.translate = diff !== 0 ? `0 ${-diff}px` : ''
      }
    }
  }
}
