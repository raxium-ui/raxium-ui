<script setup lang="ts">
import type { CollapsibleTriggerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Collapsible, useCollapsibleContext } from '@ark-ui/vue/collapsible'
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
} = defineProps<CollapsibleTriggerProps>()
const forwarded = useForwardProps(props)
const context = useCollapsibleContext()

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvCollapsible())
</script>

<template>
  <Collapsible.Trigger
    v-bind="forwarded"
    :class="crafts.trigger({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <slot v-bind="{ open: context.open, visible: context.visible }" />
    <slot
      name="indicator"
      v-bind="{ open: context.open, visible: context.visible }"
    >
      <Collapsible.Indicator
        v-if="indicator"
        :class="crafts.indicator({ class: clsx(ui?.indicator), ...theme })"
      >
        <ChevronDown :style="{ width: '1lh', height: '1lh' }" />
      </Collapsible.Indicator>
    </slot>
  </Collapsible.Trigger>
</template>
