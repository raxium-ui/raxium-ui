<script setup lang="ts">
import type { DrawerContentProps } from '.'
import { Drawer, useDrawerContext } from '@ark-ui/vue/drawer'
import { ark } from '@ark-ui/vue/factory'
import { X } from '@lucide/vue'
import { cn, cxc } from '@raxium/themes/utils'
import { provideDepthOwner, useCraft, useDepthOwner } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { useProvideStructuralComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { useThemeAttrs } from '@raxium/vue/composables/useThemeAttrs'
import { hasChildVNodeByName } from '@raxium/vue/utils/vnode'
import { computed, useAttrs, useSlots } from 'vue'
import { DrawerBackdrop, DrawerCloseTrigger } from '.'
import { injectDrawerSide } from './drawer-side-context'

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  showClose = true,
  draggable,
} = defineProps<DrawerContentProps>()

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
const hasDrawerHeader = computed(() => hasChildVNodeByName(defaultSlots.value, 'DrawerHeader'))
const showContentClose = computed(() => showClose && !hasDrawerHeader.value)
const drawer = useDrawerContext()
const open = computed(() => drawer.value.open)
const side = injectDrawerSide()

const attrs = useAttrs()
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDrawer', () => ({ side: side.value }))
const themeAttrs = useThemeAttrs(theme)
useProvideStructuralComponentTheme(theme, () => propsTheme)

const depthOwner = useDepthOwner('drawer', { active: open })
provideDepthOwner(depthOwner)
const backdropStyle = computed(() => ({
  '--rui-z-index': depthOwner.backdropZIndex.value,
}))
const positionerStyle = computed(() => ({
  '--rui-z-index': depthOwner.contentZIndex.value,
}))
</script>

<template>
  <Teleport to="body">
    <DrawerBackdrop
      v-bind="themeAttrs"
      :class="crafts.backdrop(cxc(ui?.backdrop))"
      :theme="theme"
      :style="backdropStyle"
    />
    <Drawer.Positioner
      v-bind="themeAttrs"
      :class="crafts.positioner(cxc(ui?.positioner))"
      :style="positionerStyle"
    >
      <Drawer.Content
        v-bind="{ ...attrs, ...themeAttrs }"
        :class="crafts.content(cxc(ui?.content, propsClass))"
        :draggable="draggable"
      >
        <slot />
        <slot name="close">
          <DrawerCloseTrigger
            v-if="showContentClose"
            as-child
          >
            <ark.button
              :class="cn(['absolute', 'top-0', 'right-0'], crafts.close(cxc(ui?.close)))"
              data-variant="content-close"
            >
              <X />
              <span class="sr-only">Close</span>
            </ark.button>
          </DrawerCloseTrigger>
        </slot>
      </Drawer.Content>
    </Drawer.Positioner>
  </Teleport>
</template>
