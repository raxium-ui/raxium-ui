<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup, ToggleGroupItem } from '../index'

const value = ref<string[]>(['b'])
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hff">
      value: {{ value }}
    </div>

    <ToggleGroup v-model="value" type="multiple">
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

