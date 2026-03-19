<script setup lang="ts">
import type { VNode } from 'vue'
import type { ToasterManagerProps, ToasterWrap } from '.'
import { computed, ref, useSlots } from 'vue'
import { DEFAULT_TOASTER_ID, Toast, Toaster } from '.'

const { disableDefaultToaster = false, defaultToasterProps } = defineProps<ToasterManagerProps>()

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
const toasterVNodes = computed(() => {
  if (
    defaultSlots.value?.length === 1
    && typeof defaultSlots.value?.[0] === 'object'
    && Array.isArray((defaultSlots.value?.[0] as VNode)?.children)
  ) {
    // is slot node
    return (defaultSlots.value?.[0] as any).children as VNode[]
  }
  return defaultSlots.value
})

// expose
const slotsToasters = ref<ToasterWrap[]>([])
const defaultToaster = ref<ToasterWrap>()
defineExpose({
  toasters: computed(() =>
    [...slotsToasters.value, defaultToaster.value].filter(r => r && r.toaster),
  ),
})
</script>

<template>
  <template v-if="toasterVNodes?.length">
    <component
      :is="node"
      v-for="(node, index) in toasterVNodes"
      :key="node.key"
      :ref="(el: ToasterWrap) => { slotsToasters[index] = el }"
    />
  </template>
  <Toaster
    v-if="!disableDefaultToaster"
    v-slot="{ toast }"
    ref="defaultToaster"
    placement="bottom-end"
    overlap
    v-bind="defaultToasterProps"
    :toaster-id="DEFAULT_TOASTER_ID"
  >
    <Toast :options="toast" />
  </Toaster>
</template>
