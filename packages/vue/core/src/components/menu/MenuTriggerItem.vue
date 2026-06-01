<script setup lang="ts">
import type { MenuTriggerItemProps } from '.'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cn, cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'
import { ChevronRight } from 'lucide-vue-next'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<MenuTriggerItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvMenu')
</script>

<template>
  <Menu.TriggerItem
    v-bind="forwarded"
    :class="cn(crafts.item(cxc(propsClass)), crafts.triggerItem())"
  >
    <Menu.ItemText>
      <slot />
    </Menu.ItemText>
    <Menu.Indicator :class="crafts.triggerItemIndicator()">
      <ChevronRight />
    </Menu.Indicator>
  </Menu.TriggerItem>
</template>
