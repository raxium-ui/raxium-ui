<script setup lang="ts">
import type { DialogContentProps } from '.'
import { Dialog } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { cn } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
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
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvDialog())
</script>

<template>
  <Teleport to="body">
    <DialogBackdrop :class="ui?.backdrop" :theme="theme" />
    <Dialog.Positioner :class="crafts.positioner({ class: ui?.positioner, ...theme })">
      <Dialog.Content
        v-bind="attrs"
        :class="crafts.content({ class: [ui?.content, propsClass], ...theme })"
      >
        <slot />
        <slot name="close">
          <DialogCloseTrigger
            v-if="showContentClose"
            as-child
          >
            <ark.button
              :class="
                cn(['absolute', 'top-0', 'right-0'], crafts.close({ class: ui?.close, ...theme }))
              "
              data-variant="content-close"
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
