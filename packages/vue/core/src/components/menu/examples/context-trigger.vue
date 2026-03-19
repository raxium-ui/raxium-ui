<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import {
  Menu,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuItemText,
} from '../index'

const items = Array.from({ length: 6 }, () => fakerEN.hacker.verb())
const selected = ref<string | undefined>(undefined)
</script>

<template>
  <div class="w-full flex items-center gap-4">
    <span class="text-sm text-hff">Selected: {{ selected }}</span>

    <Menu @select="selected = $event.value">
      <MenuContextTrigger as-child>
        <div class="w-80 h-24 border border-h55 rounded flex items-center justify-center text-sm text-hff select-none">
          Right click here
        </div>
      </MenuContextTrigger>
      <MenuContent>
        <MenuItem
          v-for="value in items"
          :key="value"
          :value="value"
        >
          <MenuItemText>{{ value }}</MenuItemText>
        </MenuItem>
      </MenuContent>
    </Menu>
  </div>
</template>

