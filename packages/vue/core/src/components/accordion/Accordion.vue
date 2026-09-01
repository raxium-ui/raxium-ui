<script setup lang="ts">
import type { AccordionRootEmits, UseAccordionReturn } from '@ark-ui/vue/accordion'
import type { UnwrapRef } from 'vue'
import type { AccordionProps } from '.'
import { Accordion, useAccordion } from '@ark-ui/vue/accordion'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme, useThemeCraft } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'

const { class: propsClass, theme: propsTheme, craft, ...props } = defineProps<AccordionProps>()
const emit = defineEmits<AccordionRootEmits>()
defineSlots<{
  default: (props: UnwrapRef<UseAccordionReturn>) => unknown
}>()
const forwarded = useForwardProps(props)
const accordion = useAccordion(forwarded, emit) as UseAccordionReturn

const theme = useTheme(() => propsTheme)
const themed = useThemeCraft(theme, 'tvAccordion', () => craft)
useProvideComponentTheme(themed, () => propsTheme)
const crafts = useCraft(themed, 'tvAccordion')

defineExpose({ $api: accordion })
useForwardExpose()
</script>

<template>
  <Accordion.RootProvider
    :value="accordion"
    :class="crafts.root(cxc(propsClass))"
  >
    <slot v-bind="accordion" />
  </Accordion.RootProvider>
</template>
