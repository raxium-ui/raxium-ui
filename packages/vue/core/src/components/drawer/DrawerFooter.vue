<script setup lang="ts">
import type { DrawerFooterProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { Button } from '@raxium/vue/components/button'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { useId } from 'vue'
import { DrawerCloseTrigger, TriggerFrom } from '.'
import { injectDrawerSide } from './drawer-side-context'

const { class: propsClass, theme: propsTheme, ui, widget } = defineProps<DrawerFooterProps>()
const emits = defineEmits<{
  ok: [event: MouseEvent]
  cancel: [event: MouseEvent]
}>()
const id = useId()
const side = injectDrawerSide()

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDrawer', () => ({ side: side.value }))
</script>

<template>
  <ark.div
    :id="`drawer:${id}:footer`"
    :class="crafts.footer(cxc(ui?.root, propsClass))"
    data-scope="drawer"
    data-part="footer"
  >
    <slot>
      <DrawerCloseTrigger
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
      </DrawerCloseTrigger>
      <DrawerCloseTrigger
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
      </DrawerCloseTrigger>
    </slot>
  </ark.div>
</template>
