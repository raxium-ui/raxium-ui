<script setup lang="ts">
import type { MenuTriggerItemProps } from '.'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx, cn } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<MenuTriggerItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvMenu())
</script>

<template>
  <Menu.TriggerItem
    v-bind="forwarded"
    :class="cn(crafts.item({ class: clsx(propsClass), ...theme }), crafts.triggerItem({ ...theme }))"
  >
    <Menu.ItemText>
      <slot />
    </Menu.ItemText>
    <Menu.Indicator :class="crafts.triggerItemIndicator({ ...theme })">
      <ChevronRight :style="{ width: '1lh', height: '1lh' }" />
    </Menu.Indicator>
  </Menu.TriggerItem>
</template>
