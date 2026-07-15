<script setup lang="ts">
import type { HoverCardContentProps } from '.'
import { useForwardExpose } from '@ark-ui/vue'
import { HoverCard } from '@ark-ui/vue/hover-card'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx, cxc } from '@raxium/themes/utils'
import {
  useCraft,
  useInheritedTheme,
  useProvideStructuralComponentTheme,
  useTeleportDetection,
  useTeleportedDepthOwner,
  useThemeAttrs,
} from '@raxium/vue/composables'
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

// teleport detection
const { isTeleported, setElementRef: setPositionerRef } = useTeleportDetection()
const depth = useTeleportedDepthOwner({
  type: 'hover-card',
  active: isTeleported,
  fallbackZIndex: 'var(--z-popover, var(--z-index))',
})

// theme
const theme = useInheritedTheme(() => propsTheme)
useProvideStructuralComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvHoverCard')
const themeAttrs = useThemeAttrs(theme)
const positionerStyle = computed(() => ({
  '--rui-z-index': isTeleported.value ? depth.zIndex.value : 'auto',
}))

// forward expose
const { forwardRef } = useForwardExpose()
</script>

<template>
  <HoverCard.Positioner
    :ref="setPositionerRef"
    :class="clsx(ui?.positioner)"
    :style="positionerStyle"
  >
    <HoverCard.Content
      v-bind="{ ...forwarded, ...themeAttrs }"
      :ref="forwardRef"
      :class="crafts.content(cxc(ui?.content, propsClass))"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div :class="crafts.contentInner(cxc(ui?.inner))" v-bind="themeAttrs">
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
