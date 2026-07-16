<script setup lang="ts">
import type { ScrollAreaCornerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ScrollArea } from '@ark-ui/vue/scroll-area'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<ScrollAreaCornerProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvScrollArea', undefined, () => propsTheme?.craft)
</script>

<template>
  <ScrollArea.Corner v-bind="forwarded" :class="crafts.corner(cxc(propsClass))" />
</template>
