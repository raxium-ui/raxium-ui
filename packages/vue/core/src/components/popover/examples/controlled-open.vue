<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../index'

const open = ref(false)
</script>

<template>
  <div class="w-full flex items-center gap-4">
    <Button @click="open = !open">
      Toggle open: {{ open }}
    </Button>

    <Popover v-model:open="open" :positioning="{ placement: 'bottom-start' }">
      <PopoverTrigger as-child>
        <Button variant="outline">
          Controlled Popover
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div class="flex flex-col gap-2">
          <PopoverClose />
          <div class="text-sm text-hff">
            Controlled via v-model:open
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>

