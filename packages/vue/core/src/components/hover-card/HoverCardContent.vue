<script setup lang="ts">
import type { HoverCardContentProps } from '.'
import { HoverCard } from '@ark-ui/vue/hover-card'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import {
  checkContextVNodePosition,
  excludeVNodesByName,
  findVNodeByName,
} from '@raxium/vue/utils/vnode'
import { computed, useSlots } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<HoverCardContentProps>()
const forwarded = useForwardProps<HoverCardContentProps, { asChild?: boolean }>(props)
const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'HoverCardContext', 'HoverCardContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'HoverCardArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'HoverCardArrow'))

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvHoverCard())
</script>

<template>
  <HoverCard.Positioner :class="clsx(ui?.positioner)">
    <HoverCard.Content
      v-bind="forwarded"
      :class="crafts.content({ class: clsx(ui?.content, propsClass), ...theme })"
      :data-theme-bordered="theme.bordered ? '' : undefined"
      :data-theme-skin="theme.skin"
      :data-theme-surface="theme.surface"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div
        :class="crafts.contentInner({ class: clsx(ui?.inner), ...theme })"
        :data-theme-skin="theme.skin"
        :data-theme-surface="theme.surface"
      >
        <template
          v-for="node in otherNodes"
          :key="node.key"
        >
          <component :is="node" />
        </template>
      </div>
    </HoverCard.Content>
  </HoverCard.Positioner>
</template>
