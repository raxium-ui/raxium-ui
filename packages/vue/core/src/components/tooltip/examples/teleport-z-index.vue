<script setup lang="ts">
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../../dialog'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '../index'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>
        Open tooltip z-index demo
      </Button>
    </DialogTrigger>

    <DialogContent class="w-160">
      <DialogHeader>
        Tooltip Teleport z-index
      </DialogHeader>

      <DialogBody class="flex flex-col gap-4">
        <p class="text-sm opacity-75">
          TooltipContent detects whether its positioner is teleported to body. Non-teleported content uses
          <code>z-auto</code>; teleported content uses the global depth manager z-index.
        </p>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="flex flex-col gap-3 rounded border p-4">
            <span class="text-sm font-medium">Inside dialog DOM</span>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outlined">
                  z-auto tooltip
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                Positioner stays inside Dialog, so it falls back to z-auto.
              </TooltipContent>
            </Tooltip>
          </div>

          <div class="flex flex-col gap-3 rounded border p-4">
            <span class="text-sm font-medium">Teleported to body</span>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outlined">
                  managed z-index tooltip
                </Button>
              </TooltipTrigger>
              <Teleport to="body">
                <TooltipContent>
                  <TooltipArrow />
                  Positioner is a direct child of body, so it uses the managed global z-index.
                </TooltipContent>
              </Teleport>
            </Tooltip>
          </div>
        </div>
      </DialogBody>
    </DialogContent>
  </Dialog>
</template>
