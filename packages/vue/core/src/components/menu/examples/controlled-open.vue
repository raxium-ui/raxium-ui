<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { Menu, MenuContent, MenuItem, MenuItemText, MenuTrigger } from '../index'

const open = ref(false)
const highlightedValue = ref<string>()
</script>

<template>
  <div class="w-full flex items-center gap-4">
    <div class="flex items-center gap-3">
      <Button @click="open = !open">
        Toggle open: {{ open }}
      </Button>
      <span class="text-sm text-hff">highlighted: {{ highlightedValue ?? 'null' }}</span>
    </div>

    <Menu
      v-model:open="open"
      v-model:highlighted-value="highlightedValue"
      :close-on-select="false"
      :loop-focus="true"
      :typeahead="true"
    >
      <MenuTrigger as-child>
        <Button variant="outline">
          Controlled Menu
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="copy">
          <MenuItemText>Copy</MenuItemText>
        </MenuItem>
        <MenuItem value="paste">
          <MenuItemText>Paste</MenuItemText>
        </MenuItem>
        <MenuItem value="delete" :disabled="true">
          <MenuItemText>Delete (disabled)</MenuItemText>
        </MenuItem>
      </MenuContent>
    </Menu>
  </div>
</template>
