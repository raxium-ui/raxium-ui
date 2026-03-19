<script setup lang="ts">
import type { CollapsibleRootEmits } from '@ark-ui/vue/collapsible'
import type { CollapsibleProps } from '.'
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, asChild, ...props } = defineProps<CollapsibleProps>()
const emit = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardProps(props)
const collapsiable = useCollapsible(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvCollapsible())

// expose
defineExpose({ $api: collapsiable })
useForwardExpose()
</script>

<template>
  <Collapsible.RootProvider
    :value="collapsiable"
    :class="crafts.root({ class: clsx(propsClass), ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot v-bind="collapsiable" />
    </ThemeProvider>
  </Collapsible.RootProvider>
</template>
