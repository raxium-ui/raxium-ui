<script setup lang="ts">
import type { TooltipContentProps } from '.'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx, cxc } from '@raxium/themes/utils'
import { useCraft, useTheme, useThemeAttrs } from '@raxium/vue/composables'
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

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvTooltip')
const themeAttrs = useThemeAttrs(theme)
</script>

<template>
  <Tooltip.Positioner
    :class="clsx(ui?.positioner)"
    :style="{ zIndex: `var(--z-tooltip, --z-index)` }"
  >
    <Tooltip.Content
      v-bind="{ ...forwarded, ...themeAttrs }"
      :class="crafts.content(cxc(ui?.content, propsClass))"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div
        :class="crafts.contentInner(cxc(ui?.inner))"
        v-bind="themeAttrs"
      >
        <template
          v-for="node in otherNodes"
          :key="node.key"
        >
          <component :is="node" />
        </template>
      </div>
    </Tooltip.Content>
  </Tooltip.Positioner>
</template>
