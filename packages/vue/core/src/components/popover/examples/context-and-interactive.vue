<script setup lang="ts">
import { PopoverContext } from '@ark-ui/vue/popover'
import { ref } from 'vue'
import { Button } from '../../button'
import { Switch } from '../../switch'
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../index'

const toggle = ref(true)
</script>

<template>
  <Popover :positioning="{ placement: 'bottom-start' }">
    <PopoverTrigger as-child>
      <Button variant="outline">
        Interactive Popover
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverContext v-slot="context">
        <div class="flex flex-col gap-2">
          <PopoverClose />
          <div class="text-sm text-hff">
            open: {{ context.open ? 'open' : 'closed' }}
          </div>
          <p v-if="toggle" class="text-sm text-hcc">
            test toggle
          </p>
          <Switch v-model:checked="toggle" />
        </div>
      </PopoverContext>
    </PopoverContent>
  </Popover>
</template>

