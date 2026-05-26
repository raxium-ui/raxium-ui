<script setup lang="ts">
import type { PopoverContentProps } from '.'
import { Popover } from '@ark-ui/vue/popover'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx, cxc } from '@raxium/themes/utils'
import { useCraft, useTheme, useThemeAttrs } from '@raxium/vue/composables'
import {
  checkContextVNodePosition,
  excludeVNodesByName,
  findVNodeByName,
} from '@raxium/vue/utils/vnode'
import { computed, useSlots } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<PopoverContentProps>()
const forwarded = useForwardProps(props)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'PopoverContext', 'PopoverContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'PopoverArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'PopoverArrow'))

const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvPopover')
const themeAttrs = useThemeAttrs(theme)
</script>

<template>
  <Popover.Positioner
    :class="clsx(ui?.positioner)"
    :style="{ zIndex: `var(--z-popover, --z-index)` }"
  >
    <Popover.Content
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
    </Popover.Content>
  </Popover.Positioner>
</template>
