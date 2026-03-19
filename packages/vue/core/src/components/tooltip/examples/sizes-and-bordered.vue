<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { Button } from '../../button'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Tooltip
      v-for="size in THEME_SIZE"
      :key="size"
      :theme="{ size }"
      :positioning="{ placement: 'top' }"
    >
      <TooltipTrigger as-child>
        <Button> size={{ size }} </Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        {{ size }} tooltip
      </TooltipContent>
    </Tooltip>

    <Tooltip :positioning="{ placement: 'top' }">
      <TooltipTrigger as-child>
        <Button variant="outline">
          bordered=false
        </Button>
      </TooltipTrigger>
      <TooltipContent :theme="{ bordered: false }">
        Borderless tooltip
      </TooltipContent>
    </Tooltip>
  </div>
</template>
