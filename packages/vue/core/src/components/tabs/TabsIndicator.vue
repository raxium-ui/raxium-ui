<script setup lang="ts">
import type { TabsIndicatorProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Tabs } from '@ark-ui/vue/tabs'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'
import { injectTabsContextEx } from './TabsProviderEx.vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<TabsIndicatorProps>()
const forwarded = useForwardProps(props)
const contextEx = injectTabsContextEx()

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvTabs())
</script>

<template>
  <Tabs.Indicator
    v-bind="forwarded"
    :class="crafts.indicator({ class: clsx(propsClass), orientation: contextEx.orientation, ...theme })"
  >
    <slot />
  </Tabs.Indicator>
</template>
