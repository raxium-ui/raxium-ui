<script setup lang="ts">
import type { ScrollAreaCornerProps, ScrollAreaTheme } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ScrollArea } from '@ark-ui/vue/scroll-area'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<ScrollAreaCornerProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme<ScrollAreaTheme>(() => propsTheme, undefined, () => propsTheme?.craft)
const crafts = useCraft(theme, 'tvScrollArea')
</script>

<template>
  <ScrollArea.Corner v-bind="forwarded" :class="crafts.corner(cxc(propsClass))" />
</template>
