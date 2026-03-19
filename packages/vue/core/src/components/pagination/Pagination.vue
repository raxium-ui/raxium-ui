<script setup lang="ts">
import type { PaginationRootEmits } from '@ark-ui/vue/pagination'
import type { PaginationProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Pagination, usePagination } from '@ark-ui/vue/pagination'
import { cn, clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<PaginationProps>()

const emit = defineEmits<PaginationRootEmits>()
const pagination = usePagination(useForwardProps(props), emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvPagination())
const itemClx = computed(() => crafts.value.item({ ...theme.value }))

// expose
defineExpose({ $api: pagination })
useForwardExpose()
</script>

<template>
  <Pagination.RootProvider
    :value="pagination"
    :class="crafts.root({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <ThemeProvider :value="theme">
      <ark.div
        :class="crafts.control({ class: clsx(ui?.control), ...theme })"
        data-scope="pagination"
        data-part="control"
      >
        <ark.button
          :class="cn(itemClx, clsx(ui?.firstPage))"
          @click="pagination.goToFirstPage"
        >
          <ChevronsLeft :style="{ width: '1lh', height: '1lh' }" />
        </ark.button>
        <Pagination.PrevTrigger :class="cn(itemClx, clsx(ui?.prevPage))">
          <ChevronLeft :style="{ width: '1lh', height: '1lh' }" />
        </Pagination.PrevTrigger>
        <template
          v-for="(page, index) in pagination.pages"
          :key="index"
        >
          <Pagination.Item
            v-if="page.type === 'page'"
            v-bind="page"
            :class="cn(itemClx, clsx(ui?.item))"
          >
            {{ page.value }}
          </Pagination.Item>
          <Pagination.Ellipsis
            v-else
            :index="index"
            :class="crafts.ellipsis({ class: clsx(ui?.ellipsis), ...theme })"
          >
            &#8230;
          </Pagination.Ellipsis>
        </template>
        <Pagination.NextTrigger :class="cn(itemClx, clsx(ui?.nextPage))">
          <ChevronRight :style="{ width: '1lh', height: '1lh' }" />
        </Pagination.NextTrigger>
        <ark.button
          :class="cn(itemClx, clsx(ui?.lastPage))"
          @click="pagination.goToLastPage"
        >
          <ChevronsRight :style="{ width: '1lh', height: '1lh' }" />
        </ark.button>
      </ark.div>
      <slot />
    </ThemeProvider>
  </Pagination.RootProvider>
</template>
