<script setup generic="T" lang="ts">
import type { ComponentPublicInstance, HTMLAttributes } from 'vue'
import type { VirtualGridProps } from '.'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { merge } from 'es-toolkit/compat'
import { twMerge } from 'tailwind-merge'
import { cloneVNode, computed, h, useTemplateRef } from 'vue'
import { injectVirtualContext } from '.'
import { useDetectSlotNode } from './useDetectSlotNode'

const {
  class: propsClass,
  dataSource,
  row,
  column,
  gap = [0, 0],
  rowVirtualizerOptions,
  columnVirtualizerOptions,
} = defineProps<
  VirtualGridProps<T> & {
    class?: HTMLAttributes['class']
    ui?: {
      root?: HTMLAttributes['class']
      scroll?: HTMLAttributes['class']
    }
  }
>()

const virtualContext = injectVirtualContext()
const parentEl = useTemplateRef<HTMLDivElement>('parentEl')
virtualContext.parentEl = parentEl

const grid = computed<[number, number]>(() => {
  const isInfiniteEnable = virtualContext.enableInfinite.value
  if (row && !column) {
    return [isInfiniteEnable ? row + 1 : row, Math.ceil(dataSource.length / row)]
  }
  else if (!row && column) {
    return [
      isInfiniteEnable
        ? Math.ceil(dataSource.length / column) + 1
        : Math.ceil(dataSource.length / column),
      column,
    ]
  }
  return [isInfiniteEnable ? (row ?? 1) + 1 : row ?? 1, column ?? dataSource.length]
})

const rowVirtualOptions = computed(() => {
  const _staticOptions = {
    enabled: true,
    count: grid.value[0],
    gap: gap[0],
    overscan: rowVirtualizerOptions?.overscan ?? 1,
    getScrollElement: () => parentEl.value,
    estimateSize: (index: number) => rowVirtualizerOptions?.estimateSize?.(index) ?? 30,
  }
  return merge({}, rowVirtualizerOptions, _staticOptions)
})
const rowVirtualizer = useVirtualizer<Element, Element>(rowVirtualOptions)
virtualContext.rowVirtualizer = rowVirtualizer
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const colVirtualOptions = computed(() => {
  const _staticOptions = {
    enabled: true,
    count: grid.value[1],
    gap: gap[1],
    overscan: columnVirtualizerOptions?.overscan ?? 2,
    horizontal: true,
    getScrollElement: () => parentEl.value,
    estimateSize: (index: number) => columnVirtualizerOptions?.estimateSize?.(index) ?? 30,
  }
  return merge({}, columnVirtualizerOptions, _staticOptions)
})
const colVirtualizer = useVirtualizer<Element, Element>(colVirtualOptions)
virtualContext.columnVirtualizer = colVirtualizer
const virtualColumns = computed(() => colVirtualizer.value.getVirtualItems())

const totalSizeRows = computed(() => rowVirtualizer.value.getTotalSize())
const totalSizeColumns = computed(() => colVirtualizer.value.getTotalSize())

const { itemVNode, infiniteVNode } = useDetectSlotNode()
const virtualizedRows = computed(() => {
  return virtualRows.value.map((virtualRow) => {
    const rowIndex = virtualRow.index
    const colVNodes = virtualColumns.value.map((virtualColumn) => {
      const colIndex = virtualColumn.index
      const realIndex = rowIndex * grid.value[1] + colIndex
      const data = dataSource[realIndex]
      return {
        vItem: virtualColumn,
        is: cloneVNode(itemVNode ?? h('div'), {
          key: `col-${virtualColumn.key}`,
          data,
          index: realIndex,
          rowIndex,
          colIndex,
        }),
      }
    })
    const rowVNode
      = rowIndex < (virtualContext.enableInfinite.value ? grid.value[0] - 1 : grid.value[0])
        ? h(
            'div',
            {
              'data-index': rowIndex,
              'key': `row-${virtualRow.key}`,
              'style': {
                position: 'absolute',
                display: 'flex',
                top: 0,
                left: 0,
                gap: `${gap[1]}px`,
                // FIXME: colVNodes[0].vItem.start 做 translateX 有时不准确
                // 表现像动态 dynamic measure 造成的问题
                // 1. 推测 overscan 越小发生的概率越小
                // 2. 观察scroll area 右下角也发生了偏移
                transform: `
                 translateX(${colVNodes[0].vItem.start}px)
                 translateY(${virtualRow.start - rowVirtualizer.value.options.scrollMargin}px)
                `,
              },
            },
            colVNodes.map(colVNode => colVNode.is),
          )
        : cloneVNode(infiniteVNode ?? h('div'), {
            'data-index': rowIndex,
            'style': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${parentEl.value?.clientWidth ?? 0}px`,
              transform: `
                 translateX(${Math.ceil(parentEl.value?.scrollLeft ?? 0)}px)
                 translateY(${virtualRow.start - rowVirtualizer.value.options.scrollMargin}px)
                `,
            },
          })
    return {
      vItem: virtualRow,
      is: rowVNode,
    }
  })
})

function measureElement(el: Element | ComponentPublicInstance) {
  if (rowVirtualizer.value && el) {
    if (el instanceof Element)
      rowVirtualizer.value.measureElement(el)
    else if (el.$el)
      rowVirtualizer.value.measureElement(el.$el)
  }
}
</script>

<template>
  <div
    ref="parentEl"
    :class="twMerge('rui-virtual-grid', ui?.root, propsClass)"
    data-scope="virtual-grid"
    data-part="root"
  >
    <!-- scroll area -->
    <div
      :class="twMerge('rui-virtual-grid_scroll', ui?.scroll)"
      :style="{
        width: `${totalSizeColumns}px`,
        height: `${totalSizeRows}px`,
      }"
      data-scope="virtual-grid"
      data-part="scroll"
    >
      <component
        :is="is"
        v-for="{ vItem, is } in virtualizedRows"
        :key="vItem.key"
        :ref="measureElement"
      />
    </div>
  </div>
</template>
