<script setup lang="ts">
import type { DialogContentProps } from '.'
import { Dialog, useDialogContext } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { X } from '@lucide/vue'
import { cn, cxc } from '@raxium/themes/utils'
import { provideDepthOwner, useCraft, useDepthOwner } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { useProvideStructuralComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { useThemeAttrs } from '@raxium/vue/composables/useThemeAttrs'
import { hasChildVNodeByName } from '@raxium/vue/utils/vnode'
import { computed, useAttrs, useSlots } from 'vue'
import { DialogBackdrop, DialogCloseTrigger } from '.'

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  showClose = true,
} = defineProps<DialogContentProps>()

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
const hasDialogHeader = computed(() => hasChildVNodeByName(defaultSlots.value, 'DialogHeader'))
const showContentClose = computed(() => showClose && !hasDialogHeader.value)
const dialog = useDialogContext()
const open = computed(() => dialog.value.open)

// theme
const attrs = useAttrs()
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDialog')
const themeAttrs = useThemeAttrs(theme)
useProvideStructuralComponentTheme(theme, () => propsTheme)

// depth
const depthOwner = useDepthOwner('dialog', { active: open })
provideDepthOwner(depthOwner)
// Single source of truth: expose z-index only as a CSS custom property.
// The dialog theme (`tvDialog`) references `var(--rui-z-index)` to set the actual
// `z-index`, so we cannot end up with an inline `z-index` that disagrees with
// the custom property.
const backdropStyle = computed(() => ({
  '--rui-z-index': depthOwner.backdropZIndex.value,
}))
const positionerStyle = computed(() => ({
  '--rui-z-index': depthOwner.contentZIndex.value,
}))
</script>

<template>
  <Teleport to="body">
    <DialogBackdrop
      v-bind="themeAttrs"
      :class="crafts.backdrop(cxc(ui?.backdrop))"
      :theme="theme"
      :style="backdropStyle"
    />
    <Dialog.Positioner
      v-bind="themeAttrs"
      :class="crafts.positioner(cxc(ui?.positioner))"
      :style="positionerStyle"
    >
      <Dialog.Content
        v-bind="{ ...attrs, ...themeAttrs }"
        :class="crafts.content(cxc(ui?.content, propsClass))"
      >
        <slot />
        <slot name="close">
          <DialogCloseTrigger
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
          </DialogCloseTrigger>
        </slot>
      </Dialog.Content>
    </Dialog.Positioner>
  </Teleport>
</template>
