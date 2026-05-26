<script setup lang="ts">
import { Button } from '../../button'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '../../tooltip'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../index'
</script>

<template>
  <!-- Dark dialog with light-surface tooltip -->
  <Dialog>
    <DialogTrigger as-child>
      <Button class="w-fit">
        Dark Dialog + Light Tooltip
      </Button>
    </DialogTrigger>
    <DialogContent class="w-120">
      <DialogHeader>Dark Dialog</DialogHeader>
      <DialogBody class="flex gap-4">
        <Tooltip :theme="{ surface: 'light' }">
          <TooltipTrigger as-child>
            <Button>Light Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            This tooltip should have light-surface styling
          </TooltipContent>
        </Tooltip>

        <Tooltip default-open>
          <TooltipTrigger as-child>
            <Button>Default Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            This tooltip should use component config theme, which is light surface
          </TooltipContent>
        </Tooltip>
      </DialogBody>
      <DialogFooter />
    </DialogContent>
  </Dialog>

  <!-- Razer dialog with light-surface tooltip -->
  <Dialog>
    <DialogTrigger as-child>
      <Button class="w-fit">
        Razer Dialog + Light Tooltip
      </Button>
    </DialogTrigger>
    <DialogContent
      class="w-120"
      :theme="{ surface: 'razer' }"
    >
      <DialogHeader>Razer Dialog</DialogHeader>
      <DialogBody class="flex gap-4">
        <Tooltip :theme="{ surface: 'light' }">
          <TooltipTrigger as-child>
            <Button>Light Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            This tooltip should have light-surface styling
          </TooltipContent>
        </Tooltip>

        <Tooltip default-open>
          <TooltipTrigger as-child>
            <Button>Default Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            This tooltip should use component config theme, which is razer surface
          </TooltipContent>
        </Tooltip>
      </DialogBody>
      <DialogFooter />
    </DialogContent>
  </Dialog>
</template>
