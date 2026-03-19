<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { computed, ref } from 'vue'
import { Button } from '../../button'
import { Menu, MenuCheckboxItem, MenuContent, MenuItemText, MenuTrigger } from '../index'

const items = Array.from({ length: 6 }, () => fakerEN.food.vegetable())
const checked = ref<string[]>([])
const label = computed(() => checked.value.length ? `(${checked.value.length}) selected` : 'none')

function toggle(value: string, isChecked: boolean) {
  checked.value = isChecked
    ? Array.from(new Set([...checked.value, value]))
    : checked.value.filter(v => v !== value)
}
</script>

<template>
  <div class="w-full flex items-center gap-4">
    <span class="text-sm text-hff">Checked: {{ label }}</span>

    <Menu>
      <MenuTrigger as-child>
        <Button>Menu Checkbox</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuCheckboxItem
          v-for="value in items"
          :key="value"
          :value="value"
          :close-on-select="false"
          :checked="checked.includes(value)"
          @update:checked="(val) => toggle(value, val)"
        >
          <MenuItemText>{{ value }}</MenuItemText>
        </MenuCheckboxItem>
      </MenuContent>
    </Menu>
  </div>
</template>

