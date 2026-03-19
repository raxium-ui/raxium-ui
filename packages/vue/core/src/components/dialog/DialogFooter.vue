<script setup lang="ts">
import type { DialogFooterProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { Button } from '@raxium/vue/components/button'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed, useId } from 'vue'
import { DialogCloseTrigger, TriggerFrom } from '.'

const { class: propsClass, theme: propsTheme, ui, widget } = defineProps<DialogFooterProps>()
const emits = defineEmits<{
  ok: [event: MouseEvent]
  cancel: [event: MouseEvent]
}>()
const id = useId()

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvDialog())
</script>

<template>
  <ark.div
    :id="`dialog:${id}:footer`"
    data-scope="dialog"
    data-part="footer"
    :class="crafts.footer({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <slot>
      <DialogCloseTrigger
        as-child
        :from="TriggerFrom.CANCEL_BUTTON"
      >
        <Button
          variant="text"
          v-bind="widget?.cancel"
          :class="clsx(ui?.cancel)"
          :theme="theme"
          @click="emits('cancel', $event)"
        >
          {{ widget?.cancel?.text ?? 'Cancel' }}
        </Button>
      </DialogCloseTrigger>
      <DialogCloseTrigger
        as-child
        :from="TriggerFrom.OK_BUTTON"
      >
        <Button
          v-bind="widget?.ok"
          :class="clsx(ui?.ok)"
          :theme="theme"
          @click="emits('ok', $event)"
        >
          {{ widget?.ok?.text ?? 'OK' }}
        </Button>
      </DialogCloseTrigger>
    </slot>
  </ark.div>
</template>
