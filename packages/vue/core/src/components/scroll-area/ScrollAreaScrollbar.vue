<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ScrollArea } from '@ark-ui/vue/scroll-area'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<ScrollAreaScrollbarProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvScrollArea', () => ({
  orientation: forwarded.value.orientation ?? 'vertical',
}), () => propsTheme?.craft)
</script>

<template>
  <ScrollArea.Scrollbar
    v-bind="forwarded"
    :class="
      crafts.scrollbar(cxc(ui?.root, propsClass))
    "
  >
    <ScrollArea.Thumb
      :class="
        crafts.thumb(cxc(ui?.thumb))
      "
    />
  </ScrollArea.Scrollbar>
</template>
