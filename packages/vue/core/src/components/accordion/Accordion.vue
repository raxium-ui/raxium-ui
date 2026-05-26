<script setup lang="ts">
import type { AccordionRootEmits } from '@ark-ui/vue/accordion'
import type { AccordionProps } from '.'
import { Accordion, useAccordion } from '@ark-ui/vue/accordion'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { ThemeProvider } from '@raxium/vue/providers/theme'

const { class: propsClass, theme: propsTheme, craft, ...props } = defineProps<AccordionProps>()
const emit = defineEmits<AccordionRootEmits>()
const forwarded = useForwardProps(props)
const accordion = useAccordion(forwarded, emit)

const theme = useTheme(() => propsTheme, undefined, () => craft)
const crafts = useCraft(theme, 'tvAccordion')

defineExpose({ $api: accordion })
useForwardExpose()
</script>

<template>
  <Accordion.RootProvider
    :value="accordion"
    :class="crafts.root(cxc(propsClass))"
  >
    <ThemeProvider :value="theme">
      <slot v-bind="accordion" />
    </ThemeProvider>
  </Accordion.RootProvider>
</template>
