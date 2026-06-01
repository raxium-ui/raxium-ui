<script setup lang="ts">
import type { RadioGroupItemBaseProps, UseRadioGroupItemContext } from '@ark-ui/vue/radio-group'
import type { UnwrapRef } from 'vue'
import type { RadioGroupItemProps } from '.'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { useForwardProps } from '@ark-ui/vue/utils'
import { Check, Circle } from '@lucide/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

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
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvRadioGroup', () => ({ variant }))
</script>

<template>
  <RadioGroup.Item
    v-bind="forwarded"
    :class="crafts.item(cxc(ui?.root, propsClass))"
  >
    <RadioGroup.ItemContext v-slot="context">
      <slot
        name="control"
        v-bind="context"
      >
        <RadioGroup.ItemControl
          :class="crafts.itemControl(cxc(ui?.control))"
          :data-variant="variant"
        >
          <Circle
            v-if="variant === 'default'"
            :class="crafts.itemIndicator(cxc(ui?.indicator))"
            :data-state="context.checked ? 'checked' : 'unchecked'"
            :data-variant="variant"
            :hidden="context.checked ? undefined : true"
          />
          <Check
            v-if="variant === 'checkbox'"
            :class="crafts.itemIndicator(cxc(ui?.indicator))"
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
          :class="crafts.itemText(cxc(ui?.text))"
        >
          {{ label }}
        </RadioGroup.ItemText>
      </slot>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.ItemContext>
  </RadioGroup.Item>
</template>
