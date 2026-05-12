<script setup lang="ts">
import type { TabsIndicatorProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Tabs } from '@ark-ui/vue/tabs'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { injectTabsContextEx } from './TabsProviderEx.vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<TabsIndicatorProps>()
const forwarded = useForwardProps(props)
const contextEx = injectTabsContextEx()

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvTabs', () => ({
  orientation: contextEx.value.orientation,
}))
</script>

<template>
  <Tabs.Indicator
    v-bind="forwarded"
    :class="crafts.indicator(cxc(propsClass))"
  >
    <slot />
  </Tabs.Indicator>
</template>
