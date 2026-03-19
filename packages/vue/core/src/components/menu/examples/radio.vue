<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { Button } from '../../button'
import {
  Menu,
  MenuContent,
  MenuItemText,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuTrigger,
} from '../index'

const items = Array.from({ length: 6 }, () => fakerEN.food.vegetable())
const selected = ref<string | undefined>(items[0])
</script>

<template>
  <div class="w-full flex items-center gap-4">
    <span class="text-sm text-hff">Selected: {{ selected }}</span>

    <Menu>
      <MenuTrigger as-child>
        <Button>Menu Radio</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuRadioItemGroup v-model="selected">
          <MenuRadioItem
            v-for="(value, index) in items"
            :key="value"
            :value="value"
            :close-on-select="false"
            :variant="index % 2 === 0 ? 'default' : 'checkbox'"
          >
            <MenuItemText>{{ value }}</MenuItemText>
          </MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </Menu>
  </div>
</template>

