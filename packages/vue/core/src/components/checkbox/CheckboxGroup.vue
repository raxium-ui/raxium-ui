<script setup lang="ts" generic="T extends CheckboxValueType = CheckboxValueType">
import type { UseCheckboxGroupProps } from '@ark-ui/vue/checkbox'
import type { CheckboxGroupProps, CheckboxGroupRootEmits, CheckboxValueType } from './props'
import { Checkbox, useCheckboxGroup } from '@ark-ui/vue/checkbox'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<CheckboxGroupProps<T>>()
const emit = defineEmits<CheckboxGroupRootEmits<T>>()
const checkboxGroup = useCheckboxGroup(props as unknown as UseCheckboxGroupProps, emit)
</script>

<template>
  <Checkbox.GroupProvider :value="checkboxGroup">
    <slot />
  </Checkbox.GroupProvider>
</template>
