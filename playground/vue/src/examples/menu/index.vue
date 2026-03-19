<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Button } from '@raxium/vue/components/button'
import {
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemText,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuTrigger,
  MenuTriggerItem,
} from '@raxium/vue/components/menu'
import { ref } from 'vue'

const vegetables = Array.from({ length: 5 }, () => fakerEN.food.vegetable())
const fruits = Array.from({ length: 5 }, () => fakerEN.food.fruit())
const selected = ref<string | undefined>(vegetables[0])
</script>

<template>
  <div class="flex items-center gap-4">
    <p>Selected: {{ selected }}</p>
    <Menu @select="selected = $event.value">
      <MenuTrigger as-child>
        <Button>Menu</Button>
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

    <Menu size="sm">
      <MenuTrigger as-child>
        <Button>Menu</Button>
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
              <MenuItem v-for="fruit in fruits" :key="fruit" :value="fruit">
                <MenuItemText>{{ fruit }}</MenuItemText>
              </MenuItem>
            </MenuContent>
          </Teleport>
        </Menu>
      </MenuContent>
    </Menu>

    <Menu>
      <MenuTrigger as-child>
        <Button>Menu Checkbox</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuCheckboxItem
          v-for="vegetable in vegetables"
          :key="vegetable"
          :value="vegetable"
          :close-on-select="false"
          :checked="selected === vegetable"
          @update:checked="
            (val) => {
              selected = val ? vegetable : ''
            }
          "
        >
          <MenuItemText>{{ vegetable }}</MenuItemText>
        </MenuCheckboxItem>
      </MenuContent>
    </Menu>

    <Menu>
      <MenuTrigger as-child>
        <Button>Menu Radio</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuRadioItemGroup v-model="selected">
          <MenuRadioItem
            v-for="(vegetable, index) in vegetables"
            :key="vegetable"
            :value="vegetable"
            :close-on-select="false"
            :variant="index % 2 === 0 ? 'default' : 'checkbox'"
          >
            <MenuItemText>{{ vegetable }}</MenuItemText>
          </MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </Menu>
  </div>
</template>
