<script setup lang="ts">
import { ScrollArea, ScrollAreaCorner, ScrollAreaScrollbar } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-start gap-6">
    <ScrollArea class="w-70 h-40 border border-gray-55 rounded" :theme="{ size: 'xs' }">
      <div class="h-120 w-120 bg-gray-22 p-2 text-xs text-gray-ff">
        size=xs
      </div>
      <ScrollAreaScrollbar />
      <ScrollAreaScrollbar orientation="horizontal" />
      <ScrollAreaCorner />
    </ScrollArea>

    <ScrollArea class="w-70 h-40 border border-gray-55 rounded" :theme="{ size: 'sm' }">
      <div class="h-120 w-120 bg-gray-22 p-2 text-xs text-gray-ff">
        size=sm
      </div>
      <ScrollAreaScrollbar />
      <ScrollAreaScrollbar orientation="horizontal" />
      <ScrollAreaCorner />
    </ScrollArea>

    <ScrollArea class="w-70 h-40 border border-gray-55 rounded" :theme="{ size: 'base' }">
      <div class="h-120 w-120 bg-gray-22 p-2 text-xs text-gray-ff">
        size=base
      </div>
      <ScrollAreaScrollbar />
      <ScrollAreaScrollbar orientation="horizontal" />
      <ScrollAreaCorner />
    </ScrollArea>

    <ScrollArea class="w-70 h-40 border border-gray-55 rounded" :theme="{ size: 'lg' }">
      <div class="h-120 w-120 bg-gray-22 p-2 text-xs text-gray-ff">
        size=lg
      </div>
      <ScrollAreaScrollbar />
      <ScrollAreaScrollbar orientation="horizontal" />
      <ScrollAreaCorner />
    </ScrollArea>
  </div>
</template>
