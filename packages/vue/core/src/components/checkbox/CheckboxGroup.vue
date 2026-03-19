<script setup lang="ts">
import type { UseCheckboxGroupProps } from '@ark-ui/vue/checkbox'
import type { CheckboxGroupProps, CheckboxGroupRootEmits } from './props'
import { Checkbox, useCheckboxGroup } from '@ark-ui/vue/checkbox'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<CheckboxGroupProps>()
const emit = defineEmits<CheckboxGroupRootEmits>()
const checkboxGroup = useCheckboxGroup(props as unknown as UseCheckboxGroupProps, emit)
</script>

<template>
  <Checkbox.GroupProvider :value="checkboxGroup">
    <slot />
  </Checkbox.GroupProvider>
</template>
