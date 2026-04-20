<script setup lang="ts">
import { Button } from '../../button'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '../index'
</script>

<template>
  <Tooltip>
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
