<script setup lang="ts">
import type { MenuRadioItemGroupEmits } from '@ark-ui/vue/menu'
import type { MenuRadioItemGroupProps } from '.'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<MenuRadioItemGroupProps>()
const emit = defineEmits<MenuRadioItemGroupEmits>()
const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <Menu.RadioItemGroup v-bind="forwarded">
    <slot />
  </Menu.RadioItemGroup>
</template>
