<script setup lang="ts">
import type { TabsContentProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Tabs } from '@ark-ui/vue/tabs'
import { cxc } from '@raxium/themes/utils'
import {
  useCraft,
  useInheritedTheme,
  useProvideStructuralComponentTheme,
} from '@raxium/vue/composables'
import { computed, ref, watch } from 'vue'
import { injectTabsContextEx } from './TabsProviderEx.vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<TabsContentProps>()
const forwarded = useForwardProps(props)
const contextEx = injectTabsContextEx()
const direction = ref(0)
watch(() => contextEx.value.index, (index, oldIndex) => {
  direction.value = index - oldIndex
})

const dataDirection = computed(() => {
  if (direction.value < 0)
    return 'prev'
  if (direction.value > 0)
    return 'next'
  return undefined
})

// theme
const theme = useInheritedTheme(() => propsTheme)
useProvideStructuralComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvTabs')
</script>

<template>
  <Tabs.Content
    v-bind="forwarded"
    :class="crafts.content(cxc(propsClass))"
    :data-direction="dataDirection"
    :data-orientation="contextEx.orientation"
  >
    <slot />
  </Tabs.Content>
</template>
