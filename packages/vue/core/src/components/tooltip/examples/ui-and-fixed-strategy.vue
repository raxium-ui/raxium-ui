<script setup lang="ts">
import { Button } from '../../button'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Tooltip
      :positioning="{
        placement: 'top',
        strategy: 'fixed',
      }"
    >
      <TooltipTrigger as-child>
        <Button variant="outline">
          fixed strategy
        </Button>
      </TooltipTrigger>
      <TooltipContent
        :ui="{
          content: 'bg-h00 text-hff',
          inner: 'px-3 py-2 text-sm',
        }"
      >
        <TooltipArrow />
        Custom ui + positioning.strategy=fixed
      </TooltipContent>
    </Tooltip>
  </div>
</template>
