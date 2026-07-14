<script setup lang="ts">
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../../dialog'
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
    <FloatingPanel :min-size="{ width: 360, height: 240 }">
      <FloatingPanelTrigger as-child>
        <Button class="w-fit">
          Open Floating Panel
        </Button>
      </FloatingPanelTrigger>
      <FloatingPanelContent>
        <FloatingPanelHeader>
          Floating Panel
          <template #control>
            <FloatingPanelCloseTrigger />
          </template>
        </FloatingPanelHeader>
        <div class="flex flex-col gap-3 p-3">
          <p>Open a dialog from inside the panel.</p>
          <Dialog>
            <DialogTrigger as-child>
              <Button class="w-fit">
                Open Dialog (inside panel)
              </Button>
            </DialogTrigger>
            <DialogContent class="w-120">
              <DialogHeader>Dialog Above Panel</DialogHeader>
              <DialogBody>
                This dialog is opened from within a floating panel and should sit on top.
              </DialogBody>
              <DialogFooter />
            </DialogContent>
          </Dialog>
        </div>
      </FloatingPanelContent>
    </FloatingPanel>

    <Dialog>
      <DialogTrigger as-child>
        <Button class="w-fit">
          Open Dialog (outside panel)
        </Button>
      </DialogTrigger>
      <DialogContent class="w-120">
        <DialogHeader>Standalone Dialog</DialogHeader>
        <DialogBody>
          Try mixing this with the floating panel — dialogs always stack above the
          most-recently focused panel.
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  </div>
</template>
