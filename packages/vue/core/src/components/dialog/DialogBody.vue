<script setup lang="ts">
import type { DialogBodyProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { useId } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<DialogBodyProps>()
const forwarded = useForwardProps(props)

const id = useId()
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDialog')
</script>

<template>
  <ark.div
    v-bind="forwarded"
    :id="`dialog:${id}:body`"
    :class="crafts.body(cxc(propsClass))"
    data-scope="dialog"
    data-part="body"
  >
    <slot />
  </ark.div>
</template>
