<script setup lang="ts">
import type { DialogHeaderProps } from '.'
import { Dialog } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { X } from 'lucide-vue-next'
import { computed, useId } from 'vue'
import { DialogCloseTrigger } from '.'

const { class: propsClass, theme: propsTheme, ui } = defineProps<DialogHeaderProps>()
const id = useId()

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvDialog())
</script>

<template>
  <ark.div
    :id="`dialog:${id}:header`"
    :class="crafts.header({ class: clsx(ui?.root, propsClass), ...theme })"
    data-scope="dialog"
    data-part="header"
    :data-surface="theme.surface"
  >
    <Dialog.Title
      :class="crafts.title({ class: clsx(ui?.title), ...theme })"
      :data-surface="theme.surface"
    >
      <slot />
    </Dialog.Title>
    <DialogCloseTrigger as-child>
      <ark.button
        :class="crafts.close({ class: clsx(ui?.close), ...theme })"
        :data-surface="theme.surface"
      >
        <X :style="{ width: '1lh', height: '1lh' }" />
        <span class="sr-only">Close</span>
      </ark.button>
    </DialogCloseTrigger>
  </ark.div>
</template>
