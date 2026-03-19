<script setup lang="ts">
import type { RadioGroupItemBaseProps, UseRadioGroupItemContext } from '@ark-ui/vue/radio-group'
import type { UnwrapRef } from 'vue'
import type { RadioGroupItemProps } from '.'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { Check, Circle } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  label,
  ui,
  variant = 'default',
  ...props
} = defineProps<RadioGroupItemProps>()
defineSlots<{
  control: (props: UnwrapRef<UseRadioGroupItemContext>) => any
  default: (props: UnwrapRef<UseRadioGroupItemContext>) => any
}>()
const forwarded = useForwardProps<RadioGroupItemProps, RadioGroupItemBaseProps>(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvRadioGroup())
</script>

<template>
  <RadioGroup.Item
    v-bind="forwarded"
    :class="crafts.item({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <RadioGroup.ItemContext v-slot="context">
      <slot
        name="control"
        v-bind="context"
      >
        <RadioGroup.ItemControl
          :class="crafts.itemControl({ class: clsx(ui?.control), variant, ...theme })"
          :data-variant="variant"
        >
          <Circle
            v-if="variant === 'default'"
            :class="crafts.itemIndicator({ class: clsx(ui?.indicator), variant, ...theme })"
            :data-state="context.checked ? 'checked' : 'unchecked'"
            :data-variant="variant"
            :hidden="context.checked ? undefined : true"
          />
          <Check
            v-if="variant === 'checkbox'"
            :class="crafts.itemIndicator({ class: clsx(ui?.indicator), variant, ...theme })"
            :data-state="context.checked ? 'checked' : 'unchecked'"
            :data-variant="variant"
            :hidden="context.checked ? undefined : true"
          />
        </RadioGroup.ItemControl>
      </slot>
      <slot
        name="default"
        v-bind="context"
      >
        <RadioGroup.ItemText
          v-if="label"
          :class="crafts.itemText({ class: clsx(ui?.text), ...theme })"
        >
          {{ label }}
        </RadioGroup.ItemText>
      </slot>
      <RadioGroup.ItemHiddenInput class="hidden" />
    </RadioGroup.ItemContext>
  </RadioGroup.Item>
</template>
