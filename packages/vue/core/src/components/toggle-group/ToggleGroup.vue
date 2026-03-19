<script setup lang="ts">
import type { ToggleGroupRootEmits } from '@ark-ui/vue/toggle-group'
import type { ToggleGroupProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { ToggleGroup, useToggleGroup } from '@ark-ui/vue/toggle-group'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<ToggleGroupProps>()
const emit = defineEmits<ToggleGroupRootEmits>()
const forwarded = useForwardProps(props)
const toggleGroup = useToggleGroup(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvToggleGroup())

// expose
defineExpose({ $api: toggleGroup })
useForwardExpose()
</script>

<template>
  <ToggleGroup.RootProvider
    :value="toggleGroup"
    :class="
      crafts.root({
        class: propsClass,
        orientation: forwarded.orientation ?? 'horizontal',
        ...theme,
      })
    "
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </ToggleGroup.RootProvider>
</template>
