<script setup lang="ts">
import type { SwitchLabelProps } from '.'
import { Switch } from '@ark-ui/vue/switch'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, asChild } = defineProps<SwitchLabelProps>()

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSwitch())
</script>

<template>
  <Switch.Label
    :class="crafts.label({ class: [propsClass], ...theme })"
    :as-child="asChild"
  >
    <slot />
  </Switch.Label>
</template>
