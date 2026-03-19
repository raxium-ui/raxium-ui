<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Checkbox, CheckboxGroup } from '@raxium/vue/components/checkbox'
import {
  RadioGroup,
  RadioGroupItem,
} from '@raxium/vue/components/radio-group'
import { ref } from 'vue'

const checkboxState = ref<boolean | 'indeterminate'>(true)

const groupItems = Array.from({ length: 5 }).map(() => {
  const bird = fakerEN.animal.bird()
  return {
    label: bird,
    value: bird,
  }
})
const groupState = ref<string[]>([])

const radioGroupItems = Array.from({ length: 5 }).map(() => {
  const cat = fakerEN.animal.cat()
  return {
    label: cat,
    value: cat,
  }
})
const radioGroupState = ref<string[]>([])
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox v-model:checked="checkboxState" label="Checkbox" />
    <Checkbox default-checked="indeterminate" label="Checkbox" />
    <Checkbox label="Checkbox" disabled />
    <CheckboxGroup v-model:value="groupState">
      <Checkbox
        v-for="(item, index) in groupItems"
        :key="item.value"
        :label="item.label"
        :name="item.value"
        :value="item.value"
        :disabled="index === 4"
      />
    </CheckboxGroup>

    <RadioGroup>
      <RadioGroupItem
        v-for="(item, index) in radioGroupItems"
        :key="item.value"
        :variant="index % 2 === 0 ? 'default' : 'checkbox'"
        :label="item.label"
        :value="item.value"
      />
    </RadioGroup>
  </div>
</template>
