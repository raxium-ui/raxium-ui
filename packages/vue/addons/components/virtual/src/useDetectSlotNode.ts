import type { VNode } from 'vue'
import { Fragment, useSlots } from 'vue'
import { injectVirtualContext } from './VirtualRoot'

export function useDetectSlotNode() {
  const slots = useSlots()
  const defaultSlotNode = slots.default!()[0]
  const virtualContext = injectVirtualContext()

  let itemVNode: VNode | null = null
  let infiniteVNode: VNode | null = null
  if (defaultSlotNode.type === Fragment && Array.isArray(defaultSlotNode.children)) {
    defaultSlotNode.children.forEach((child) => {
      if (child) {
        const _cname = ((child as VNode).type as any).name
        if (_cname === 'VirtualInfiniteLoading') {
          infiniteVNode = child as VNode
          virtualContext.enableInfinite.value = true
        }
        else if (_cname === 'VirtualListItem' || _cname === 'VirtualGridItem') {
          itemVNode = child as VNode
        }
      }
    })
  }
  else {
    itemVNode = defaultSlotNode
  }

  return {
    itemVNode,
    infiniteVNode,
  }
}
