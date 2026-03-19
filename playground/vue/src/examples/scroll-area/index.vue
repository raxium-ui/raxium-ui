<script setup lang="ts">
import { ScrollArea, ScrollAreaCorner, ScrollAreaScrollbar } from '@raxium/vue/components/scroll-area'
</script>

<template>
  <div class="flex items-center gap-4">
    <ScrollArea class="w-100 h-50 bg-h22">
      <div class="h-100 w-100">
        scroll area
      </div>
      <ScrollAreaScrollbar />
    </ScrollArea>

    <ScrollArea class="w-100 h-50">
      <div class="h-200 w-200 bg-h44">
        scroll area both scrollbars
      </div>
      <ScrollAreaScrollbar />
      <ScrollAreaScrollbar orientation="horizontal" />
      <ScrollAreaCorner />
    </ScrollArea>

    <ScrollArea class="w-100 h-50" size="sm">
      <div class="h-200 w-200 bg-h44">
        scroll area size small
      </div>
      <ScrollAreaScrollbar />
      <ScrollAreaScrollbar orientation="horizontal" />
    </ScrollArea>
  </div>
</template>
