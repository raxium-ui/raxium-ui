<script setup lang="ts">
import type { CollapsibleTriggerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Collapsible, useCollapsibleContext } from '@ark-ui/vue/collapsible'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { ChevronDown } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  indicator = true,
  ui,
  ...props
} = defineProps<CollapsibleTriggerProps>()
const forwarded = useForwardProps(props)
const context = useCollapsibleContext()

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvCollapsible')
</script>

<template>
  <Collapsible.Trigger
    v-bind="forwarded"
    :class="crafts.trigger(cxc(ui?.root, propsClass))"
  >
    <slot v-bind="{ open: context.open, visible: context.visible }" />
    <slot
      name="indicator"
      v-bind="{ open: context.open, visible: context.visible }"
    >
      <Collapsible.Indicator
        v-if="indicator"
        :class="crafts.indicator(cxc(ui?.indicator))"
      >
        <ChevronDown :style="{ width: '1lh', height: '1lh' }" />
      </Collapsible.Indicator>
    </slot>
  </Collapsible.Trigger>
</template>
