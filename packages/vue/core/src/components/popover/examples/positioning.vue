<script setup lang="ts">
import { Button } from '../../button'
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Popover :positioning="{ placement: 'top' }">
      <PopoverTrigger as-child>
        <Button variant="outline">
          Top
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        placement=top
      </PopoverContent>
    </Popover>

    <Popover :positioning="{ placement: 'right' }">
      <PopoverTrigger as-child>
        <Button variant="outline">
          Right
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        placement=right
      </PopoverContent>
    </Popover>

    <Popover :positioning="{ placement: 'bottom-start' }">
      <PopoverTrigger as-child>
        <Button variant="outline">
          Bottom-start
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        placement=bottom-start
      </PopoverContent>
    </Popover>
  </div>
</template>

