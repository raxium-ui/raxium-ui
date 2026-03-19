<script setup lang="ts">
import type { MenuItemGroupProps } from '.'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  label,
  ui,
  ...props
} = defineProps<MenuItemGroupProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvMenu())
</script>

<template>
  <Menu.ItemGroup
    v-bind="forwarded"
    :class="crafts.itemGroup({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <slot name="label">
      <Menu.ItemGroupLabel
        :class="crafts.itemGroupLabel({ class: clsx(ui?.label), ...theme })"
      >
        {{ label }}
      </Menu.ItemGroupLabel>
    </slot>
    <slot />
  </Menu.ItemGroup>
</template>
