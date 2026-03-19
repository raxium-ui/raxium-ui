<script setup lang="ts">
import { Button } from '../../button'
import {
  FloatingPanel,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelHeader,
  FloatingPanelTrigger,
} from '../index'
</script>

<template>
  <FloatingPanel :min-size="{ width: 360, height: 240 }">
    <FloatingPanelTrigger as-child>
      <Button class="w-fit">
        Open FloatingPanel
      </Button>
    </FloatingPanelTrigger>

    <FloatingPanelContent>
      <FloatingPanelHeader>
        FloatingPanel
        <template #control>
          <FloatingPanelCloseTrigger />
        </template>
      </FloatingPanelHeader>

      <div class="p-3">
        Minimal content.
      </div>
    </FloatingPanelContent>
  </FloatingPanel>
</template>
