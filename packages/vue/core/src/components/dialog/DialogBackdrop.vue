<script setup lang="ts">
import type { DialogBackdropProps } from '.'
import { useForwardExpose } from '@ark-ui/vue'
import { useDialogContext } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { usePresence } from '@ark-ui/vue/presence'
import { cxc } from '@raxium/themes/utils'
import { useConfig, useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { computed, mergeProps, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { class: propsClass, theme: propsTheme, asChild } = defineProps<DialogBackdropProps>()

const dialog = useDialogContext()
const dialogConfig = useConfig('dialog')
const presence = usePresence(
  computed(() => ({
    present: dialog.value.open,
    lazyMount: dialogConfig.value?.lazyMount,
    unmountOnExit: dialogConfig.value?.unmountOnExit,
  })),
)
const attrs = useAttrs()

const mergedProps = computed(() => {
  const parts: Array<Record<string, unknown>> = [
    dialog.value.getBackdropProps() as Record<string, unknown>,
    presence.value.presenceProps as Record<string, unknown>,
    attrs as unknown as Record<string, unknown>,
  ]
  return mergeProps(...parts)
})

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDialog')

// expose
useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="mergedProps"
    :class="crafts.backdrop(cxc(propsClass))"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
