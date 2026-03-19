<script setup lang="ts">
import type { DialogBackdropProps } from '.'
import { useForwardExpose, usePresenceContext } from '@ark-ui/vue'
import { useDialogContext } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { merge, omit } from 'es-toolkit'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, asChild } = defineProps<DialogBackdropProps>()

const dialog = useDialogContext()
const presence = usePresenceContext()

const mergedProps = computed(() =>
  merge(
    dialog.value.getBackdropProps(),
    /*
     * Here we omit the ref because there should be only one ref to control the global presence state
     * and that is DialogContent
     * @see DialogContent.vue
     */
    omit(presence.value.presenceProps, ['ref']),
  ),
)
// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvDialog())

// expose
useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="mergedProps"
    :class="crafts.backdrop({ class: clsx(propsClass), ...theme })"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
