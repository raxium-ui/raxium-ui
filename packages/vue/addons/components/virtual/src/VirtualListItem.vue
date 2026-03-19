<script lang="ts" generic="T" setup>
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'
import { useTemplateRef, watch } from 'vue'
import { injectVirtualContext } from './VirtualRoot'

defineOptions({
  name: 'VirtualListItem',
})
const { class: propsClass, data, dynamic, index } = defineProps<{
  class?: HTMLAttributes['class']
  data?: T
  dynamic?: boolean
  index?: number
}>()
defineSlots<{ default: { data: T, index?: number } }>()

const { virtualizer } = injectVirtualContext()
const el = useTemplateRef('el')
watch(el, (el) => {
  if (virtualizer?.value && el && dynamic)
    virtualizer.value.measureElement(el)
})
</script>

<template>
  <div
    v-bind="$attrs"
    ref="el"
    :data-index="index"
    :class="twMerge('rui-virtual-list-item', propsClass)"
    data-scope="virtual-list"
    data-part="item"
  >
    <slot
      :data="data"
      :index="index"
    />
  </div>
</template>
