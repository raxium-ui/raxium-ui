<script setup lang="ts">
import type { AccordionTriggerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Accordion, useAccordionItemContext } from '@ark-ui/vue/accordion'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  indicator = true,
  ui,
  ...props
} = defineProps<AccordionTriggerProps>()
const forwarded = useForwardProps(props)
const itemContext = useAccordionItemContext()

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvAccordion())
</script>

<template>
  <Accordion.ItemTrigger
    v-bind="forwarded"
    :class="crafts.trigger({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <slot v-bind="{ open: itemContext.expanded, visible: itemContext.expanded }" />
    <slot
      name="indicator"
      v-bind="{ open: itemContext.expanded, visible: itemContext.expanded }"
    >
      <Accordion.ItemIndicator
        v-if="indicator"
        :class="crafts.indicator({ class: clsx(ui?.indicator), ...theme })"
      >
        <ChevronDown :style="{ width: '1lh', height: '1lh' }" />
      </Accordion.ItemIndicator>
    </slot>
  </Accordion.ItemTrigger>
</template>
