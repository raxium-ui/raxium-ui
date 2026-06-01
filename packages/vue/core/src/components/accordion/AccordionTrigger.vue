<script setup lang="ts">
import type { AccordionTriggerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Accordion, useAccordionItemContext } from '@ark-ui/vue/accordion'
import { ChevronDown } from '@lucide/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'

const {
  class: propsClass,
  theme: propsTheme,
  indicator = true,
  ui,
  ...props
} = defineProps<AccordionTriggerProps>()
const forwarded = useForwardProps(props)
const itemContext = useAccordionItemContext()

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvAccordion')
</script>

<template>
  <Accordion.ItemTrigger
    v-bind="forwarded"
    :class="crafts.trigger(cxc(ui?.root, propsClass))"
  >
    <slot v-bind="{ open: itemContext.expanded, visible: itemContext.expanded }" />
    <slot
      name="indicator"
      v-bind="{ open: itemContext.expanded, visible: itemContext.expanded }"
    >
      <Accordion.ItemIndicator
        v-if="indicator"
        :class="crafts.indicator(cxc(ui?.indicator))"
      >
        <ChevronDown />
      </Accordion.ItemIndicator>
    </slot>
  </Accordion.ItemTrigger>
</template>
