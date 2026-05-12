<script setup lang="ts">
import { ScrollArea, ScrollAreaScrollbar } from '../index'
</script>

<template>
  <ScrollArea class="w-100 h-50 bg-gray-22">
    <div class="h-120 w-100 text-sm text-gray-ff overflow-hidden">
      <p>Scroll area (vertical)</p>
      <p class="text-gray-cc">
        Scroll down to see scrollbar behavior.
      </p>
      <div class="h-80" />
      <p>Bottom</p>
    </div>
    <ScrollAreaScrollbar />
  </ScrollArea>
</template>
