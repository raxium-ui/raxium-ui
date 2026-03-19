<script setup lang="ts">
import { Icon } from '../../icon'
import { ToggleGroup, ToggleGroupItem } from '../index'
</script>

<template>
  <ToggleGroup :default-value="['bold']" aria-label="Text formatting">
    <ToggleGroupItem value="bold" aria-label="Bold">
      <Icon icon="lucide:bold" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Italic">
      <Icon icon="lucide:italic" />
    </ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Underline">
      <Icon icon="lucide:underline" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
