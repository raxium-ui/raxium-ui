<script setup lang="ts">
import type { PaginationGoToProps } from '.'
import { usePaginationContext } from '@ark-ui/vue'
import { cxc } from '@raxium/themes/utils'
import { NumberInput } from '@raxium/vue/components/number-input'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'
import { provide, ref, watch } from 'vue'
import { PAGINATION_GO_TO_PROVIDE_KEY } from '.'

const { class: propsClass, theme: propsTheme, ui, widget } = defineProps<PaginationGoToProps>()

const context = usePaginationContext()
const innerValue = ref<string>(`${context.value.page}`)
watch(
  () => context.value.page,
  (p) => {
    innerValue.value = String(p)
  },
  { immediate: true },
)

function clampPage(page: string | number) {
  const nPage = Number(page)
  if (!Number.isFinite(nPage))
    return 1
  return Math.min(Math.max(Math.trunc(nPage), 1), Math.max(1, context.value.totalPages ?? 1))
}

function goInputPage() {
  const page = clampPage(innerValue.value)
  innerValue.value = String(page)
  context.value.setPage(page)
}

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvPaginationGoto')

provide(PAGINATION_GO_TO_PROVIDE_KEY, { goInputPage })
</script>

<template>
  <div
    :class="crafts.root(cxc(ui?.root, propsClass))"
    data-scope="pagination"
    data-part="goto"
  >
    <slot name="prefix" />
    <NumberInput
      v-bind="widget?.input"
      v-model="innerValue"
      :theme="theme"
      :class="crafts.input(cxc(widget?.input?.class, ui?.input))"
      :min="1"
      :max="context.totalPages"
      clamp-value-on-blur
      type="number"
      @keydown.enter.prevent="goInputPage"
    />
    <slot name="suffix" />
  </div>
</template>
