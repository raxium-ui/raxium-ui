<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '../../toggle-group'
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <p class="text-sm text-hff">
      使用 ToggleGroup 将多个 Toggle 组织为互斥选项
    </p>

    <ToggleGroup>
      <ToggleGroupItem value="left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
