<script setup lang="ts">
import type { DialogContentProps } from '.'
import { Dialog } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { X } from '@lucide/vue'
import { cn, cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
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

const attrs = useAttrs()
const theme = useInheritedTheme(() => propsTheme)
useProvideStructuralComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvDialog')
const themeAttrs = useThemeAttrs(theme)
</script>

<template>
  <Teleport to="body">
    <DialogBackdrop
      :class="crafts.backdrop(cxc(ui?.backdrop))"
      :theme="theme"
      v-bind="themeAttrs"
    />
    <Dialog.Positioner
      :class="crafts.positioner(cxc(ui?.positioner))"
      v-bind="themeAttrs"
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
              :class="
                cn(
                  ['absolute', 'top-0', 'right-0'],
                  crafts.close(cxc(ui?.close)),
                )
              "
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
