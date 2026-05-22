<script setup lang="ts">
import type { DialogFooterProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { Button } from '@raxium/vue/components/button'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { useId } from 'vue'
import { DialogCloseTrigger, TriggerFrom } from '.'

const { class: propsClass, theme: propsTheme, ui, widget } = defineProps<DialogFooterProps>()
const emits = defineEmits<{
  ok: [event: MouseEvent]
  cancel: [event: MouseEvent]
}>()
const id = useId()

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDialog')
</script>

<template>
  <ark.div
    :id="`dialog:${id}:footer`"
    :class="crafts.footer(cxc(ui?.root, propsClass))"
    data-scope="dialog"
    data-part="footer"
  >
    <slot>
      <DialogCloseTrigger
        as-child
        :from="TriggerFrom.CANCEL_BUTTON"
      >
        <Button
          variant="text"
          color="default"
          v-bind="widget?.cancel"
          :class="ui?.cancel"
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
          :class="ui?.ok"
          :theme="theme"
          @click="emits('ok', $event)"
        >
          {{ widget?.ok?.text ?? 'OK' }}
        </Button>
      </DialogCloseTrigger>
    </slot>
  </ark.div>
</template>
