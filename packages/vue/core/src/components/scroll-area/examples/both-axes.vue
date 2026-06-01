<script setup lang="ts">
import { ScrollArea, ScrollAreaCorner, ScrollAreaScrollbar } from '../index'
</script>

<template>
  <ScrollArea class="w-100 h-50 border border-gray-55 rounded">
    <div class="h-200 w-200 bg-gray-22 p-3 text-sm text-gray-ff">
      Both scrollbars + corner
    </div>
    <ScrollAreaScrollbar />
    <ScrollAreaScrollbar orientation="horizontal" />
    <ScrollAreaCorner />
  </ScrollArea>
</template>
