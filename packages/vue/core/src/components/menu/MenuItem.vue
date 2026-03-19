<script setup lang="ts">
import type { MenuItemProps } from '.'
import { MenuItem } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<MenuItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvMenu())
</script>

<template>
  <MenuItem v-bind="forwarded" :class="crafts.item({ class: clsx(propsClass), ...theme })">
    <slot />
  </MenuItem>
</template>
