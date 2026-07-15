<script setup lang="ts">
import type { DialogBackdropProps } from '.'
import { useForwardExpose, usePresenceContext } from '@ark-ui/vue'
import { useDialogContext } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { omit } from 'es-toolkit'
import { computed, mergeProps, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { class: propsClass, theme: propsTheme, asChild } = defineProps<DialogBackdropProps>()

const dialog = useDialogContext()
const presence = usePresenceContext()
const attrs = useAttrs()

const mergedProps = computed(() => {
  const parts: Array<Record<string, unknown>> = [
    dialog.value.getBackdropProps() as Record<string, unknown>,
    /*
     * Here we omit the ref because there should be only one ref to control the global presence state
     * and that is DialogContent
     * @see DialogContent.vue
     */
    omit(presence.value.presenceProps, ['ref']) as Record<string, unknown>,
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
