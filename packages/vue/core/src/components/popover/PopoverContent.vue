<script setup lang="ts">
import type { PopoverContentProps } from '.'
import { useForwardExpose } from '@ark-ui/vue'
import { Popover } from '@ark-ui/vue/popover'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
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

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<PopoverContentProps>()
const forwarded = useForwardProps(props)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'PopoverContext', 'PopoverContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'PopoverArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'PopoverArrow'))

// teleport detection
const { isTeleported, setElementRef: setPositionerRef } = useTeleportDetection()
const depth = useTeleportedDepthOwner({
  type: 'popover',
  active: isTeleported,
  fallbackZIndex: 'var(--z-popover, var(--z-index))',
})

// theme
const theme = useInheritedTheme(() => propsTheme)
useProvideStructuralComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvPopover')
const themeAttrs = useThemeAttrs(theme)
const positionerStyle = computed(() => ({
  zIndex: isTeleported.value ? depth.zIndex.value : 'auto',
}))

// forward expose
const { forwardRef } = useForwardExpose()
</script>

<template>
  <Popover.Positioner
    :ref="setPositionerRef"
    :class="[ui?.positioner]"
    :style="positionerStyle"
  >
    <Popover.Content
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
    </Popover.Content>
  </Popover.Positioner>
</template>
