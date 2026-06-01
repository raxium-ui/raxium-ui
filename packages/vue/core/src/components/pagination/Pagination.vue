<script setup lang="ts">
import type { PaginationRootEmits } from '@ark-ui/vue/pagination'
import type { PaginationProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Pagination, usePagination } from '@ark-ui/vue/pagination'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  craft,
  ui,
  dynamicPageEnd,
  ...props
} = defineProps<PaginationProps>()

const emit = defineEmits<PaginationRootEmits>()
const pagination = usePagination(useForwardProps(props), emit)

// theme
const theme = useTheme(
  () => propsTheme,
  undefined,
  () => craft,
)
useProvideComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvPagination')
const itemClx = computed(() => crafts.value.item())

// dynamic page end
const isDynamicPageEnd = computed(() => dynamicPageEnd && dynamicPageEnd > 1)
const dynamicPages = computed(() => {
  if (!isDynamicPageEnd.value)
    return pagination.value.pages
  const { page, pages, totalPages } = pagination.value
  if (page + dynamicPageEnd! - 1 < totalPages) {
    const newPages = [...pages]
    newPages.splice(pages.length - 1, 1, { type: 'page', value: page + dynamicPageEnd! })
    return newPages
  }
  return pages
})

// expose
defineExpose({ $api: pagination })
useForwardExpose()
</script>

<template>
  <Pagination.RootProvider
    :value="pagination"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >
    <ark.div
      :class="crafts.control(cxc(ui?.control))"
      data-scope="pagination"
      data-part="control"
    >
      <ark.button
        :class="[itemClx, ui?.firstPage]"
        @click="pagination.goToFirstPage"
      >
        <ChevronsLeft />
      </ark.button>
      <Pagination.PrevTrigger :class="[itemClx, ui?.prevPage]">
        <ChevronLeft />
      </Pagination.PrevTrigger>
      <template
        v-for="(page, index) in isDynamicPageEnd ? dynamicPages : pagination.pages"
        :key="index"
      >
        <Pagination.Item
          v-if="page.type === 'page'"
          v-bind="page"
          :class="[itemClx, ui?.item]"
        >
          {{ page.value }}
        </Pagination.Item>
        <Pagination.Ellipsis
          v-else
          :index="index"
          :class="crafts.ellipsis(cxc(ui?.ellipsis))"
        >
          &#8230;
        </Pagination.Ellipsis>
      </template>
      <Pagination.NextTrigger :class="[itemClx, ui?.nextPage]">
        <ChevronRight />
      </Pagination.NextTrigger>
      <ark.button
        :class="[itemClx, ui?.lastPage]"
        @click="pagination.goToLastPage"
      >
        <ChevronsRight />
      </ark.button>
    </ark.div>
    <slot />
  </Pagination.RootProvider>
</template>
