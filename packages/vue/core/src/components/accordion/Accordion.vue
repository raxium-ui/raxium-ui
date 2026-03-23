<script setup lang="ts">
import type { AccordionRootEmits } from '@ark-ui/vue/accordion'
import type { AccordionProps } from '.'
import { Accordion, useAccordion } from '@ark-ui/vue/accordion'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<AccordionProps>()
const emit = defineEmits<AccordionRootEmits>()
const forwarded = useForwardProps(props)
const accordion = useAccordion(forwarded, emit)

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvAccordion())

defineExpose({ $api: accordion })
useForwardExpose()
</script>

<template>
  <Accordion.RootProvider
    :value="accordion"
    :class="crafts.root({ class: clsx(propsClass), ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot v-bind="accordion" />
    </ThemeProvider>
  </Accordion.RootProvider>
</template>
