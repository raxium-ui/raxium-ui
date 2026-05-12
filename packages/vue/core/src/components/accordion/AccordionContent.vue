<script setup lang="ts">
import type { AccordionContentProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Accordion } from '@ark-ui/vue/accordion'
import { clsx } from '@raxium/themes/utils'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<AccordionContentProps>()
const forwarded = useForwardProps(props)

const theme = useInheritedTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvAccordion())
</script>

<template>
  <Accordion.ItemContent
    v-bind="forwarded"
    :class="crafts.content({ class: clsx(propsClass), ...theme })"
  >
    <slot />
  </Accordion.ItemContent>
</template>
