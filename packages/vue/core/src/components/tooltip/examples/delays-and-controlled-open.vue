<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '../index'

const open = ref(false)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Button variant="outline" @click="open = !open">
        Toggle open: {{ open }}
      </Button>
    </div>

    <div class="flex flex-wrap items-center gap-4">
      <Tooltip :open-delay="600" :close-delay="200">
        <TooltipTrigger as-child>
          <Button>
            Delays (600/200)
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          openDelay=600 closeDelay=200
        </TooltipContent>
      </Tooltip>

      <Tooltip v-model:open="open" :positioning="{ placement: 'bottom' }">
        <TooltipTrigger as-child>
          <Button variant="outline">
            Controlled open
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          This tooltip is controlled by a button.
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
</template>
