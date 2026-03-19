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

const axis = ref<'x' | 'y' | 'xy' | 'xyc' | 'custom'>('xyc')
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <span class="text-sm opacity-70">resize-axis:</span>
    <Button type="button" :theme="{ size: 'sm' }" @click="axis = 'x'">
      x
    </Button>
    <Button type="button" :theme="{ size: 'sm' }" @click="axis = 'y'">
      y
    </Button>
    <Button type="button" :theme="{ size: 'sm' }" @click="axis = 'xy'">
      xy
    </Button>
    <Button type="button" :theme="{ size: 'sm' }" @click="axis = 'xyc'">
      xyc
    </Button>
    <Button type="button" :theme="{ size: 'sm' }" @click="axis = 'custom'">
      custom
    </Button>
  </div>

  <FloatingPanel :resize-axis="axis" :min-size="{ width: 360, height: 240 }">
    <FloatingPanelTrigger as-child>
      <Button class="w-fit mt-3">
        Open FloatingPanel
      </Button>
    </FloatingPanelTrigger>

    <FloatingPanelContent>
      <FloatingPanelHeader>
        Resize axis: {{ axis }}
        <template #control>
          <FloatingPanelCloseTrigger />
        </template>
      </FloatingPanelHeader>

      <div class="p-3 space-y-2">
        <div>Try resizing the panel.</div>
        <div class="text-sm opacity-70">
          When axis = "custom", no resize triggers are rendered by default.
        </div>
      </div>
    </FloatingPanelContent>
  </FloatingPanel>
</template>
