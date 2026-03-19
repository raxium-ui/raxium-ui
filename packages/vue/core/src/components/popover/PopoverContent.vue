<script setup lang="ts">
import type { PopoverContentProps } from '.'
import { Popover } from '@ark-ui/vue/popover'
import { useForwardProps } from '@ark-ui/vue/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
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
} = defineProps<PopoverContentProps>()
const forwarded = useForwardProps(props)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'PopoverContext', 'PopoverContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'PopoverArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'PopoverArrow'))

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvPopover())
</script>

<template>
  <Popover.Positioner
    :class="ui?.positioner"
    :style="{ zIndex: `var(--z-popover, --z-index)` }"
  >
    <Popover.Content
      v-bind="forwarded"
      :class="crafts.content({ class: [ui?.content, propsClass], ...theme })"
      :data-theme-bordered="theme.bordered ? '' : undefined"
      :data-theme-skin="theme.skin"
      :data-theme-surface="theme.surface"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div
        :class="crafts.contentInner({ class: [ui?.inner], ...theme })"
        :data-theme-skin="theme.skin"
        :data-theme-surface="theme.surface"
      >
        <template v-for="node in otherNodes" :key="node.key">
          <component :is="node" />
        </template>
      </div>
    </Popover.Content>
  </Popover.Positioner>
</template>
