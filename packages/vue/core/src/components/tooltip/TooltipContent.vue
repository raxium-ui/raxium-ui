<script setup lang="ts">
import type { TooltipContentProps } from '.'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx, cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import {
  checkContextVNodePosition,
  excludeVNodesByName,
  findVNodeByName,
} from '@raxium/vue/utils/vnode'
import { computed, useSlots } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<TooltipContentProps>()
const forwarded = useForwardProps<TooltipContentProps, { asChild?: boolean }>(props)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'TooltipContext', 'TooltipContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'TooltipArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'TooltipArrow'))

const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvTooltip')
</script>

<template>
  <Tooltip.Positioner :class="clsx(ui?.positioner)" :style="{ zIndex: `var(--z-tooltip, --z-index)` }">
    <Tooltip.Content
      v-bind="forwarded"
      :class="crafts.content(cxc(ui?.content, propsClass))"
      :data-theme-bordered="theme.bordered ? '' : undefined"
      :data-theme-skin="theme.skin"
      :data-theme-surface="theme.surface"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div
        :class="crafts.contentInner(cxc(ui?.inner))"
        :data-theme-skin="theme.skin"
        :data-theme-surface="theme.surface"
      >
        <template v-for="node in otherNodes" :key="node.key">
          <component :is="node" />
        </template>
      </div>
    </Tooltip.Content>
  </Tooltip.Positioner>
</template>
