<script setup lang="ts">
import type { HoverCardContentProps } from '.'
import { HoverCard } from '@ark-ui/vue/hover-card'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx, cxc } from '@raxium/themes/utils'
import { useCraft, useTheme, useThemeAttrs } from '@raxium/vue/composables'
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
const crafts = useCraft(theme, 'tvHoverCard')
const themeAttrs = useThemeAttrs(theme)
</script>

<template>
  <HoverCard.Positioner :class="clsx(ui?.positioner)">
    <HoverCard.Content
      v-bind="{ ...forwarded, ...themeAttrs }"
      :class="crafts.content(cxc(ui?.content, propsClass))"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div :class="crafts.contentInner(cxc(ui?.inner))">
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
