<script setup lang="ts">
import type { PaginationPageSizeProps } from '.'
import { usePaginationContext } from '@ark-ui/vue'
import { createListCollection } from '@ark-ui/vue/collection'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
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
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvPaginationPageSize())
</script>

<template>
  <div
    :class="crafts.root({ class: clsx(ui?.root, propsClass), ...theme })"
    data-scope="pagination"
    data-part="page-size"
  >
    <slot name="prefix" />
    <Select
      v-bind="theme"
      v-model="modelValue"
      :collection="collection"
      :class="crafts.control({ class: clsx(ui?.control), ...theme })"
    >
      <SelectTrigger :class="crafts.trigger({ class: clsx(ui?.trigger), ...theme })">
        <SelectValue
          :class="crafts.value({ class: clsx(ui?.value), ...theme })"
          :placeholder="placeholder ?? 'Page size'"
        />
      </SelectTrigger>
      <SelectContent :class="crafts.content({ class: clsx(ui?.content), ...theme })">
        <SelectItem
          v-for="item in collection.items"
          :key="item.value"
          :item="item"
          :class="crafts.item({ class: clsx(ui?.item), ...theme })"
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
