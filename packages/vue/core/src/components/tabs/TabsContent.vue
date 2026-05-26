<script setup lang="ts">
import type { TabsContentProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Tabs } from '@ark-ui/vue/tabs'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'
import { ref, watch } from 'vue'
import { injectTabsContextEx } from './TabsProviderEx.vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<TabsContentProps>()
const forwarded = useForwardProps(props)
const contextEx = injectTabsContextEx()
const direction = ref(0)
watch(() => contextEx.value.index, (index, oldIndex) => {
  direction.value = index - oldIndex
})

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvTabs', () => ({
  prev: direction.value < 0,
  next: direction.value > 0,
}))
</script>

<template>
  <Tabs.Content
    v-bind="forwarded"
    :class="crafts.content(cxc(propsClass))"
  >
    <slot />
  </Tabs.Content>
</template>
