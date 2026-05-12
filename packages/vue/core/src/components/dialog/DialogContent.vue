<script setup lang="ts">
import type { DialogContentProps } from '.'
import { Dialog } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { cn, cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { hasChildVNodeByName } from '@raxium/vue/utils/vnode'
import { X } from 'lucide-vue-next'
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
const crafts = useCraft(theme, 'tvDialog')
</script>

<template>
  <Teleport to="body">
    <DialogBackdrop
      :class="crafts.backdrop(cxc(ui?.backdrop))"
      :theme="theme"
      :data-surface="theme.surface"
    />
    <Dialog.Positioner
      :class="crafts.positioner(cxc(ui?.positioner))"
      :data-surface="theme.surface"
    >
      <Dialog.Content
        v-bind="attrs"
        :class="crafts.content(cxc(ui?.content, propsClass))"
        :data-surface="theme.surface"
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
              :data-surface="theme.surface"
            >
              <X :style="{ width: '1lh', height: '1lh' }" />
              <span class="sr-only">Close</span>
            </ark.button>
          </DialogCloseTrigger>
        </slot>
      </Dialog.Content>
    </Dialog.Positioner>
  </Teleport>
</template>
