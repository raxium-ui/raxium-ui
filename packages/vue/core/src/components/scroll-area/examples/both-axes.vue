<script setup lang="ts">
import { ScrollArea, ScrollAreaCorner, ScrollAreaScrollbar } from '../index'
</script>

<template>
  <ScrollArea class="w-100 h-50 border border-h55 rounded">
    <div class="h-200 w-200 bg-h22 p-3 text-sm text-hff">
      Both scrollbars + corner
    </div>
    <ScrollAreaScrollbar />
    <ScrollAreaScrollbar orientation="horizontal" />
    <ScrollAreaCorner />
  </ScrollArea>
</template>

