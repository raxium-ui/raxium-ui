<script setup lang="ts">
import { Button } from '../../button'
import {
  FloatingPanel,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelHeader,
  FloatingPanelTrigger,
} from '../index'
import { ref } from 'vue'

const minSize = ref({ width: 360, height: 240 })
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <span class="text-sm opacity-70">min-size:</span>
    <Button
      type="button"
      :theme="{ size: 'sm' }"
      @click="minSize = { width: 300, height: 200 }"
    >
      300×200
    </Button>
    <Button
      type="button"
      :theme="{ size: 'sm' }"
      @click="minSize = { width: 480, height: 320 }"
    >
      480×320
    </Button>
    <Button
      type="button"
      :theme="{ size: 'sm' }"
      @click="minSize = { width: 640, height: 420 }"
    >
      640×420
    </Button>
  </div>

  <FloatingPanel :min-size="minSize">
    <FloatingPanelTrigger as-child>
      <Button class="w-fit mt-3">
        Open FloatingPanel
      </Button>
    </FloatingPanelTrigger>

    <FloatingPanelContent>
      <FloatingPanelHeader>
        Min size: {{ minSize.width }}×{{ minSize.height }}
        <template #control>
          <FloatingPanelCloseTrigger />
        </template>
      </FloatingPanelHeader>

      <div class="p-3 space-y-2">
        <div>Try resizing below the current min size.</div>
      </div>
    </FloatingPanelContent>
  </FloatingPanel>
</template>
