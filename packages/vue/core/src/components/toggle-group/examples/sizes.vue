<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { ToggleGroup, ToggleGroupItem } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <ToggleGroup v-for="size in THEME_SIZE" :key="size" :default-value="['b']" :theme="{ size }">
      <ToggleGroupItem value="a">
        A
      </ToggleGroupItem>
      <ToggleGroupItem value="b">
        B
      </ToggleGroupItem>
      <ToggleGroupItem value="c">
        C
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
