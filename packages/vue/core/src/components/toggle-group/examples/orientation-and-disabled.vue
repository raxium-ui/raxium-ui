<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-start gap-8">
    <div class="flex flex-col gap-2">
      <div class="text-sm text-hff">
        horizontal
      </div>
      <ToggleGroup :default-value="['b']" orientation="horizontal">
        <ToggleGroupItem value="a">
          A
        </ToggleGroupItem>
        <ToggleGroupItem value="b">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="c" disabled>
          C (disabled)
        </ToggleGroupItem>
      </ToggleGroup>
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-sm text-hff">
        vertical
      </div>
      <ToggleGroup :default-value="['b']" orientation="vertical">
        <ToggleGroupItem value="a">
          A
        </ToggleGroupItem>
        <ToggleGroupItem value="b">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="c" disabled>
          C (disabled)
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  </div>
</template>
