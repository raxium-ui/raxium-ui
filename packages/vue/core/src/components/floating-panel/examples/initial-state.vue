<script setup lang="ts">
import { Button } from '../../button'
import {
  FloatingPanel,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelHeader,
  FloatingPanelPinTrigger,
  FloatingPanelTrigger,
} from '../index'
</script>

<template>
  <FloatingPanel
    :min-size="{ width: 360, height: 240 }"
    :opacity="60"
    :pinned="true"
  >
    <FloatingPanelTrigger as-child>
      <Button class="w-fit">
        Open FloatingPanel
      </Button>
    </FloatingPanelTrigger>

    <FloatingPanelContent>
      <FloatingPanelHeader>
        Initial state
        <template #control>
          <FloatingPanelPinTrigger />
          <FloatingPanelCloseTrigger />
        </template>
      </FloatingPanelHeader>

      <div class="p-3 space-y-2">
        <div>Start with pinned = true, opacity = 60.</div>
        <div class="text-sm opacity-70">
          When pinned, dragging is disabled.
        </div>
      </div>
    </FloatingPanelContent>
  </FloatingPanel>
</template>
