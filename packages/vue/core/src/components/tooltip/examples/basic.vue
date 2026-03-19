<script setup lang="ts">
import { Button } from '../../button'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '../index'
</script>

<template>
  <Tooltip :positioning="{ placement: 'bottom-start' }">
    <TooltipTrigger as-child>
      <Button>
        Hover tooltip
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <TooltipArrow />
      Basic tooltip content
    </TooltipContent>
  </Tooltip>
</template>
