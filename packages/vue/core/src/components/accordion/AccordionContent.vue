<script setup lang="ts">
import type { AccordionContentProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Accordion } from '@ark-ui/vue/accordion'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<AccordionContentProps>()
const forwarded = useForwardProps(props)

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvAccordion')
</script>

<template>
  <Accordion.ItemContent
    v-bind="forwarded"
    :class="crafts.content(cxc(propsClass))"
  >
    <slot />
  </Accordion.ItemContent>
</template>
