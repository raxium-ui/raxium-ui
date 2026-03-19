<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { THEME_SIZE } from '@raxium/shared/constant'
import { ref } from 'vue'
import { Button } from '../../button'
import {
  Menu,
  MenuArrow,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemText,
  MenuTrigger,
} from '../index'

const vegetables = Array.from({ length: 5 }, () => fakerEN.food.vegetable())
const fruits = Array.from({ length: 5 }, () => fakerEN.food.fruit())
const selected = ref<string | undefined>(vegetables[0])
</script>

<template>
  <div class="w-full flex items-center gap-4">
    <span class="text-sm text-hff">Selected: {{ selected }}</span>

    <Menu
      v-for="size in THEME_SIZE"
      :key="size"
      :theme="{ size }"
      @select="selected = $event.value"
    >
      <MenuTrigger as-child>
        <Button :class="size">
          Menu {{ size }}
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuItemGroup label="Vegetables">
          <MenuItem
            v-for="vegetable in vegetables"
            :key="vegetable"
            :value="vegetable"
          >
            <MenuItemText>{{ vegetable }}</MenuItemText>
          </MenuItem>
        </MenuItemGroup>
        <MenuItemGroup label="Fruits">
          <MenuItem
            v-for="(fruit, index) in fruits"
            :key="fruit"
            :value="fruit"
            :disabled="index % 2 === 0"
          >
            <MenuItemText>{{ fruit }}</MenuItemText>
          </MenuItem>
        </MenuItemGroup>
      </MenuContent>
    </Menu>
  </div>
</template>
