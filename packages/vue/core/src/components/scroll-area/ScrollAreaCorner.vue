<script setup lang="ts">
import type { ScrollAreaCornerProps, ScrollAreaTheme } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ScrollArea } from '@ark-ui/vue/scroll-area'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<ScrollAreaCornerProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme<ScrollAreaTheme>(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvScrollArea())
</script>

<template>
  <ScrollArea.Corner v-bind="forwarded" :class="crafts.corner({ class: clsx(propsClass), ...theme })" />
</template>
