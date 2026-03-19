<script setup lang="ts">
import type { DialogBodyProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed, useId } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<DialogBodyProps>()
const forwarded = useForwardProps(props)

const id = useId()
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvDialog())
</script>

<template>
  <ark.div
    v-bind="forwarded"
    :id="`dialog:${id}:body`"
    data-scope="dialog"
    data-part="body"
    :class="crafts.body({ class: propsClass, ...theme })"
  >
    <slot />
  </ark.div>
</template>
