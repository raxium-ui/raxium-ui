<script setup lang="ts">
import type { MenuItemGroupProps } from '.'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'

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
const crafts = useCraft(theme, 'tvMenu')
</script>

<template>
  <Menu.ItemGroup
    v-bind="forwarded"
    :class="crafts.itemGroup(cxc(ui?.root, propsClass))"
  >
    <slot name="label">
      <Menu.ItemGroupLabel
        :class="crafts.itemGroupLabel(cxc(ui?.label))"
      >
        {{ label }}
      </Menu.ItemGroupLabel>
    </slot>
    <slot />
  </Menu.ItemGroup>
</template>
