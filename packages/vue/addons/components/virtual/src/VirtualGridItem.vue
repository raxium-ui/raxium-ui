<script lang="ts" generic="T" setup>
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'
import { useTemplateRef, watch } from 'vue'
import { injectVirtualContext } from '.'

defineOptions({
  name: 'VirtualGridItem',
})
const {
  data,
  index,
  rowIndex,
  colIndex,
  class: propsClass,
} = defineProps<{
  data?: T
  class?: HTMLAttributes['class']
  index?: number
  rowIndex?: number
  colIndex?: number
}>()
defineSlots<{
  default: {
    data: T
    index?: number
    rowIndex?: number
    colIndex?: number
  }
}>()

const { columnVirtualizer } = injectVirtualContext()
const el = useTemplateRef('el')
watch(el, (el) => {
  if (columnVirtualizer?.value && el)
    columnVirtualizer.value.measureElement(el)
})
</script>

<template>
  <div
    v-bind="$attrs"
    ref="el"
    :class="twMerge('rui-virtual-grid-item', propsClass)"
    :data-index="index"
    data-scope="virtual-grid"
    data-part="item"
  >
    <slot
      :data="data"
      :index="index"
      :row-index="rowIndex"
      :col-index="colIndex"
    />
  </div>
</template>
