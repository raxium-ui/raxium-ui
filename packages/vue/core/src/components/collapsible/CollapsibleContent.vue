<script setup lang="ts">
import type { CollapsibleContentProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Collapsible } from '@ark-ui/vue/collapsible'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<CollapsibleContentProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvCollapsible())
</script>

<template>
  <Collapsible.Content
    v-bind="forwarded"
    :class="crafts.content({ class: [propsClass], ...theme })"
  >
    <slot />
  </Collapsible.Content>
</template>
