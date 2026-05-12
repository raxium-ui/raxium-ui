<script setup lang="ts">
import type { CollapsibleContentProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Collapsible } from '@ark-ui/vue/collapsible'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useTheme } from '@raxium/vue/composables/useTheme'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<CollapsibleContentProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvCollapsible')
</script>

<template>
  <Collapsible.Content
    v-bind="forwarded"
    :class="crafts.content(cxc(propsClass))"
  >
    <slot />
  </Collapsible.Content>
</template>
