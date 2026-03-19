<script setup lang="ts">
import type { DialogHeaderProps } from '.'
import { Dialog } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { X } from 'lucide-vue-next'
import { computed, useId } from 'vue'
import { DialogCloseTrigger } from '.'

const { class: propsClass, theme: propsTheme } = defineProps<DialogHeaderProps>()
const id = useId()

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvDialog())
</script>

<template>
  <ark.div
    :id="`dialog:${id}:header`"
    data-scope="dialog"
    data-part="header"
    :class="crafts.header({ class: [ui?.root, propsClass], ...theme })"
  >
    <Dialog.Title :class="crafts.title({ class: ui?.title, ...theme })">
      <slot />
    </Dialog.Title>
    <DialogCloseTrigger as-child>
      <ark.button :class="crafts.close({ class: ui?.close, ...theme })">
        <X :style="{ width: '1lh', height: '1lh' }" />
        <span class="sr-only">Close</span>
      </ark.button>
    </DialogCloseTrigger>
  </ark.div>
</template>
