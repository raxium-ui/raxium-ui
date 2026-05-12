<script setup lang="ts">
import type { MenuContentProps } from '.'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx, cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import {
  checkContextVNodePosition,
  excludeVNodesByName,
  findVNodeByName,
} from '@raxium/vue/utils/vnode'
import { computed, useSlots } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<MenuContentProps>()
const forwarded = useForwardProps<MenuContentProps, { asChild?: boolean }>(
  props,
)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'MenuContext', 'MenuContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'MenuArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'MenuArrow'))

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvMenu')
</script>

<template>
  <Menu.Positioner
    :class="clsx(ui?.positioner)"
    :style="{ zIndex: `var(--z-dropdown, --z-index)` }"
  >
    <Menu.Content
      v-bind="forwarded"
      :class="crafts.content(cxc(ui?.content, propsClass))"
      :data-theme-bordered="theme.bordered ? '' : undefined"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div :class="crafts.contentInner(cxc(ui?.inner))">
        <template v-for="node in otherNodes" :key="node.key">
          <component :is="node" />
        </template>
      </div>
    </Menu.Content>
  </Menu.Positioner>
</template>
