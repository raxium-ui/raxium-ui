<script setup lang="ts">
import type { SwitchLabelProps } from '.'
import { Switch } from '@ark-ui/vue/switch'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'

const { class: propsClass, theme: propsTheme, asChild } = defineProps<SwitchLabelProps>()

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSwitch')
</script>

<template>
  <Switch.Label
    :class="crafts.label(cxc(propsClass))"
    :as-child="asChild"
  >
    <slot />
  </Switch.Label>
</template>
