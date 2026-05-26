<script setup lang="ts">
import type { PaginationPageSizeProps } from '.'
import { usePaginationContext } from '@ark-ui/vue'
import { createListCollection } from '@ark-ui/vue/collection'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'
import { uniq } from 'es-toolkit'
import { computed, ref, watch } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'

const {
  class: propsClass,
  theme: propsTheme,
  sizes,
  placeholder,
  ui,
} = defineProps<PaginationPageSizeProps>()

const context = usePaginationContext()
const modelValue = ref([context.value.pageSize])
watch(modelValue, v => context.value.setPageSize(v[0]), { immediate: true })

const sizeItems = computed(() => {
  const list = uniq(sizes?.length ? sizes : [10, 20, 30, 50])
  return list.map(n => ({ label: String(n), value: n }))
})
const collection = computed(() => createListCollection({ items: sizeItems.value }))

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvPaginationPageSize')
</script>

<template>
  <div
    :class="crafts.root(cxc(ui?.root, propsClass))"
    data-scope="pagination"
    data-part="page-size"
  >
    <slot name="prefix" />
    <Select
      v-bind="theme"
      v-model="modelValue"
      :collection="collection"
      :class="crafts.control(cxc(ui?.control))"
    >
      <SelectTrigger :class="crafts.trigger(cxc(ui?.trigger))">
        <SelectValue
          :class="crafts.value(cxc(ui?.value))"
          :placeholder="placeholder ?? 'Page size'"
        />
      </SelectTrigger>
      <SelectContent :class="crafts.content(cxc(ui?.content))">
        <SelectItem
          v-for="item in collection.items"
          :key="item.value"
          :item="item"
          :class="crafts.item(cxc(ui?.item))"
        >
          {{ item.label }}
          <template #indicator>
            <span />
          </template>
        </SelectItem>
      </SelectContent>
    </Select>
    <slot name="suffix" />
  </div>
</template>
