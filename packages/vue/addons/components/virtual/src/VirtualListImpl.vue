<script lang="ts" generic="T" setup>
import type { HTMLAttributes } from 'vue'
import type { VirtualListProps } from '.'
import { cn, useForwardProps } from '@raxium/vue-addons-shared'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { merge } from 'es-toolkit/compat'
import { cloneVNode, computed, h, useTemplateRef } from 'vue'
import { injectVirtualContext } from '.'
import { useDetectSlotNode } from './useDetectSlotNode'

const {
  class: propsClass,
  dataSource,
  ui,
  ...props
} = defineProps<
  VirtualListProps<T> & {
    class?: HTMLAttributes['class']
    ui?: {
      root?: HTMLAttributes['class']
      scroll?: HTMLAttributes['class']
    }
  }
>()
defineSlots<{ default?: () => any }>()

const virtualContext = injectVirtualContext()
const parentEl = useTemplateRef<Element>('parentEl')
virtualContext.parentEl = parentEl

const forwarded = useForwardProps(props)
const virtualOptions = computed(() => {
  const _staticOptions = {
    enabled: true,
    count: virtualContext.enableInfinite.value ? dataSource.length + 1 : dataSource.length,
    overscan: forwarded.value.overscan ?? 1,
    getScrollElement: () => parentEl.value,
    estimateSize: (index: number) => forwarded.value.estimateSize?.(index) ?? 30,
  }
  return merge({}, forwarded.value, _staticOptions)
})
const virtualizer = useVirtualizer<Element, Element>(virtualOptions)
virtualContext.virtualizer = virtualizer

const { itemVNode, infiniteVNode } = useDetectSlotNode()

const virtualizedItems = computed(() => {
  return virtualizer.value.getVirtualItems().map((virtualItem) => {
    const _realIndex = virtualItem.index
    const renderNode = _realIndex < dataSource.length ? itemVNode : infiniteVNode
    return {
      vItem: virtualItem,
      is: cloneVNode(renderNode ?? h('div'), {
        'data': dataSource[_realIndex],
        'index': _realIndex,
        'key': `${virtualItem.key}`,
        'data-index': _realIndex,
        'aria-setsize': dataSource.length,
        'aria-posinset': _realIndex + 1,
        'style': forwarded.value.horizontal
          ? {
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateX(${virtualItem.start}px)`,
              overflowAnchor: 'none',
            }
          : {
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateY(${virtualItem.start}px)`,
              overflowAnchor: 'none',
            },
      }),
    }
  })
})

const scrollAreaStyle = computed(() => {
  const totalSize = virtualizer.value.getTotalSize()
  if (forwarded.value.horizontal) {
    return {
      width: `${totalSize}px`,
      height: '100%',
      position: 'relative' as const,
    }
  }
  return {
    height: `${totalSize}px`,
    width: '100%',
    position: 'relative' as const,
  }
})

// expose
defineExpose({
  get virtualizer() {
    return virtualizer.value
  },
})
</script>

<template>
  <div
    ref="parentEl"
    :class="cn('rui-virtual-list', ui?.root, propsClass)"
    :data-horizontal="forwarded.horizontal ? true : undefined"
    data-scope="virtual-list"
    data-part="root"
  >
    <!-- scroll area -->
    <div
      :class="cn('rui-virtual-list_scroll', ui?.scroll)"
      :style="scrollAreaStyle"
      data-scope="virtual-list"
      data-part="scroll"
    >
      <!-- items -->
      <component
        :is="is"
        v-for="{ is, vItem } in virtualizedItems"
        :key="vItem.key"
      />
    </div>
  </div>
</template>
