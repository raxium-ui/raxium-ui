<script setup lang="ts">
import type { MenuItemProps } from '.'
import { MenuItem } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<MenuItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvMenu')
</script>

<template>
  <MenuItem v-bind="forwarded" :class="crafts.item(cxc(propsClass))">
    <slot />
  </MenuItem>
</template>
