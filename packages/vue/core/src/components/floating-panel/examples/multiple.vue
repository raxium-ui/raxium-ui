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
  <div class="flex flex-wrap gap-3">
    <FloatingPanel :min-size="{ width: 320, height: 220 }">
      <FloatingPanelTrigger as-child>
        <Button class="w-fit">
          Open Panel A
        </Button>
      </FloatingPanelTrigger>
      <FloatingPanelContent>
        <FloatingPanelHeader>
          Panel A
          <template #control>
            <FloatingPanelCloseTrigger />
          </template>
        </FloatingPanelHeader>
        <div class="p-3">
          Click any panel to bring it to the front.
        </div>
      </FloatingPanelContent>
    </FloatingPanel>

    <FloatingPanel :min-size="{ width: 320, height: 220 }">
      <FloatingPanelTrigger as-child>
        <Button class="w-fit">
          Open Panel B
        </Button>
      </FloatingPanelTrigger>
      <FloatingPanelContent>
        <FloatingPanelHeader>
          Panel B
          <template #control>
            <FloatingPanelCloseTrigger />
          </template>
        </FloatingPanelHeader>
        <div class="p-3">
          Focus this panel to promote its z-index.
        </div>
      </FloatingPanelContent>
    </FloatingPanel>

    <FloatingPanel :min-size="{ width: 320, height: 220 }">
      <FloatingPanelTrigger as-child>
        <Button class="w-fit">
          Open Panel C
        </Button>
      </FloatingPanelTrigger>
      <FloatingPanelContent>
        <FloatingPanelHeader>
          Panel C
          <template #control>
            <FloatingPanelCloseTrigger />
          </template>
        </FloatingPanelHeader>
        <div class="p-3">
          Last focused panel wins.
        </div>
      </FloatingPanelContent>
    </FloatingPanel>
  </div>
</template>
