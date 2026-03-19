<script setup lang="ts">
import type { IconProps } from '.'
import { useForwardProps } from '@ark-ui/vue/utils'
import { Icon } from '@iconify/vue'
import { useTheme } from '@raxium/vue/composables'

const { class: propsClass, theme: propsTheme, icon, ...props } = defineProps<IconProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
</script>

<template>
  <Icon
    v-bind="forwarded"
    :class="theme.crafts.tvIcon({ class: [propsClass], ...theme })"
    :icon="icon"
  />
</template>
