<script setup lang="ts">
import type { AccordionItemProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Accordion } from '@ark-ui/vue/accordion'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<AccordionItemProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvAccordion())
</script>

<template>
  <Accordion.Item
    v-bind="forwarded"
    :class="crafts.item({ class: clsx(propsClass), ...theme })"
  >
    <slot />
  </Accordion.Item>
</template>
