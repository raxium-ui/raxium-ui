<script setup lang="ts">
import type { TooltipContentProps } from '.'
import { useForwardExpose } from '@ark-ui/vue'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import {
  useCraft,
  useInheritedTheme,
  useProvideStructuralComponentTheme,
  useTeleportDetection,
  useTeleportedDepth,
  useThemeAttrs,
} from '@raxium/vue/composables'
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

// teleport detection
const { isTeleported, setElementRef: setPositionerRef } = useTeleportDetection()
const depth = useTeleportedDepth({
  type: 'tooltip',
  active: isTeleported,
  fallbackZIndex: 'var(--z-tooltip, var(--z-index))',
})

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvTooltip')
const themeAttrs = useThemeAttrs(theme)
useProvideStructuralComponentTheme(theme, () => propsTheme)
const positionerStyle = computed(() => ({
  zIndex: isTeleported.value ? depth.zIndex.value : 'auto',
}))

// forward expose
const { forwardRef } = useForwardExpose()
</script>

<template>
  <Tooltip.Positioner
    :ref="setPositionerRef"
    :class="crafts.positioner(cxc(ui?.positioner))"
    :style="positionerStyle"
  >
    <Tooltip.Content
      v-bind="{ ...forwarded, ...themeAttrs }"
      :ref="forwardRef"
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
