<script setup lang="ts">
import type { DialogBackdropProps } from '.'
import { useForwardExpose, usePresenceContext } from '@ark-ui/vue'
import { useDialogContext } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { merge, omit } from 'es-toolkit'
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { class: propsClass, theme: propsTheme, asChild } = defineProps<DialogBackdropProps>()

const dialog = useDialogContext()
const presence = usePresenceContext()
const attrs = useAttrs()

const mergedProps = computed(() =>
  merge(
    merge(
      dialog.value.getBackdropProps(),
      /*
       * Here we omit the ref because there should be only one ref to control the global presence state
       * and that is DialogContent
       * @see DialogContent.vue
       */
      omit(presence.value.presenceProps, ['ref']),
    ),
    attrs,
  ),
)

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
