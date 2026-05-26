<script setup lang="ts">
import type { CollapsibleRootEmits } from '@ark-ui/vue/collapsible'
import type { CollapsibleProps } from '.'
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'

const {
  class: propsClass,
  theme: propsTheme,
  asChild,
  craft,
  ...props
} = defineProps<CollapsibleProps>()
const emit = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardProps(props)
const collapsiable = useCollapsible(forwarded, emit)

// theme
const theme = useTheme(
  () => propsTheme,
  undefined,
  () => craft,
)
const crafts = useCraft(theme, 'tvCollapsible')

// expose
defineExpose({ $api: collapsiable })
useForwardExpose()
</script>

<template>
  <Collapsible.RootProvider
    :value="collapsiable"
    :class="crafts.root(cxc(propsClass))"
  >
    <ThemeProvider :value="theme">
      <slot v-bind="collapsiable" />
    </ThemeProvider>
  </Collapsible.RootProvider>
</template>
