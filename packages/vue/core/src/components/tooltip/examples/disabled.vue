<script setup lang="ts">
import { Button } from '../../button'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Tooltip :disabled="true">
      <TooltipTrigger as-child>
        <Button variant="outline">
          Disabled tooltip
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        This text should not be shown.
      </TooltipContent>
    </Tooltip>

    <Tooltip :positioning="{ placement: 'top' }">
      <TooltipTrigger as-child>
        <Button>
          Enabled tooltip
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        Tooltip works normally.
      </TooltipContent>
    </Tooltip>
  </div>
</template>
