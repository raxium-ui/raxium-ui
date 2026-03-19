<script lang="ts">
import type { ComputedRef } from 'vue'
import { createContext } from '@ark-ui/vue'
import { computed } from 'vue'

interface TabsContextEx {
  index: number
  orientation: 'horizontal' | 'vertical'
}
const [provideTabsContextEx, injectTabsContextEx] = createContext<ComputedRef<TabsContextEx>>('TabsProviderEx')

export { injectTabsContextEx }
</script>

<script setup lang="ts">
const props = defineProps<{ value: TabsContextEx }>()
provideTabsContextEx(computed(() => props.value))
</script>

<template>
  <slot />
</template>
