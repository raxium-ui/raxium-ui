<script setup lang="ts">
import { Button } from '../../button'
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverIndicator,
  PopoverTrigger,
} from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Popover :positioning="{ placement: 'bottom-start' }">
      <PopoverTrigger as-child>
        <Button>
          Click Popover <PopoverIndicator />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div class="flex flex-col gap-2">
          <PopoverClose />
          <div class="text-sm text-hff">
            Popover content
          </div>
          <div class="text-sm text-hcc">
            This is a basic popover example.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
