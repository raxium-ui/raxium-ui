<script setup lang="ts">
import type { TabsTriggerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Tabs } from '@ark-ui/vue/tabs'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'
import { injectTabsContextEx } from './TabsProviderEx.vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<TabsTriggerProps>()
const forwarded = useForwardProps(props)
const contextEx = injectTabsContextEx()

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvTabs', () => ({
  orientation: contextEx.value.orientation,
}))
</script>

<template>
  <Tabs.Trigger
    v-bind="forwarded"
    :class="crafts.trigger(cxc(propsClass))"
  >
    <slot />
  </Tabs.Trigger>
</template>
