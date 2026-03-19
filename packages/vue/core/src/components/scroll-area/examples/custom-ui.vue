<script setup lang="ts">
import { Checkbox } from '@raxium/vue/components/checkbox'
import { ScrollArea, ScrollAreaCorner, ScrollAreaScrollbar } from '../index'
</script>

<template>
  <ScrollArea
    class="w-100 h-50 rounded border border-h55"
    :ui="{
      root: 'bg-h22',
      viewport: 'rounded',
      content: 'p-3',
    }"
  >
    <div class="h-160 w-160 text-sm text-hff">
      Custom UI (root/viewport/content)
      <div class="h-120" />
      End
    </div>
    <Checkbox label="Checkbox" />

    <ScrollAreaScrollbar
      :ui="{ root: 'bg-h00/20', thumb: 'bg-rz-green/70 hover:bg-rz-green' }"
    />
    <ScrollAreaScrollbar
      orientation="horizontal"
      :ui="{ root: 'bg-h00/20', thumb: 'bg-rz-green/70 hover:bg-rz-green' }"
    />
    <ScrollAreaCorner class="bg-h00/20" />
  </ScrollArea>
</template>
