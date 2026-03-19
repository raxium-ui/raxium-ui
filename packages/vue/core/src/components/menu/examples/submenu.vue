<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { Button } from '../../button'
import {
  Menu,
  MenuArrow,
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuTrigger,
  MenuTriggerItem,
} from '../index'

const vegetables = Array.from({ length: 5 }, () => fakerEN.food.vegetable())
const fruits = Array.from({ length: 5 }, () => fakerEN.food.fruit())
const selected = ref<string | undefined>(undefined)
</script>

<template>
  <div class="w-full flex items-center gap-4">
    <span class="text-sm text-hff">Selected: {{ selected }}</span>

    <Menu :theme="{ size: 'sm' }" @select="selected = $event.value">
      <MenuTrigger as-child>
        <Button>Submenu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuArrow />

        <Menu
          key="vegetables"
          :positioning="{ placement: 'right', offset: { mainAxis: 10 } }"
        >
          <MenuTriggerItem value="vegetables">
            Vegetables
          </MenuTriggerItem>
          <Teleport to="body">
            <MenuContent>
              <MenuItem
                v-for="vegetable in vegetables"
                :key="vegetable"
                :value="vegetable"
              >
                <MenuItemText>{{ vegetable }}</MenuItemText>
              </MenuItem>
            </MenuContent>
          </Teleport>
        </Menu>

        <Menu
          key="fruits"
          :positioning="{ placement: 'right', offset: { mainAxis: 10 } }"
        >
          <MenuTriggerItem value="fruits">
            Fruits
          </MenuTriggerItem>
          <Teleport to="body">
            <MenuContent>
              <MenuItem
                v-for="fruit in fruits"
                :key="fruit"
                :value="fruit"
              >
                <MenuItemText>{{ fruit }}</MenuItemText>
              </MenuItem>
            </MenuContent>
          </Teleport>
        </Menu>
      </MenuContent>
    </Menu>
  </div>
</template>
