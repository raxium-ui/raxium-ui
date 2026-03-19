<script setup lang="tsx">
import { Button } from '@raxium/vue/components/button'
import {
  Dialog,
  dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@raxium/vue/components/dialog'
import { useOverlay } from '@raxium/vue/components/overlay'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { ref } from 'vue'
import TestDialog from './TestDialog.vue'

function handleOpenChange(details: any) {
  console.log('open change', details)
}
function handleExitComplete() {
  console.log('exit complete')
}
function handleEscapeKeyDown(event: KeyboardEvent) {
  console.log('escape key down', event)
}

const open = ref(false)
function handleVModelOpen() {
  open.value = true
  console.log('handleVModelOpen', open.value)
}

function handleOpenDialog() {
  dialog({
    title: 'Functional Dialog',
    content: () => <div>Render Content</div>,
    onOpenChange: (details) => {
      console.log('functional dialog onOpenChange', details)
    },
    onOk: () => {
      console.log('im ok')
    },
    onCancel: () => {
      console.log('im cancel')
    },
  })
}

const overlay = useOverlay()
const overlayDialog = overlay.create(TestDialog)
function handleOpenOverlayDialog() {
  overlayDialog.open()
}
</script>

<template>
  <div class="flex items-center gap-4">
    <!-- <Dialog
      :lazy-mount="true"
      :unmount-on-exit="true"
      @open-change="handleOpenChange"
      @escape-key-down="handleEscapeKeyDown"
      @exit-complete="handleExitComplete"
    >
      <DialogTrigger as-child>
        <Button class="w-fit">
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent class="w-100">
        <DialogHeader> Dialog Title </DialogHeader>
        <DialogBody> Dialog Body </DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>

    <Dialog>
      <DialogTrigger as-child>
        <Button class="w-fit">
          Open No Header Dialog
        </Button>
      </DialogTrigger>
      <DialogContent class="w-100">
        <DialogBody> Dialog Body </DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>

    <Dialog>
      <DialogTrigger as-child>
        <Button class="w-fit">
          Open Small Dialog
        </Button>
      </DialogTrigger>
      <ThemeProvider :value="{ size: 'sm' }">
        <DialogContent class="w-100">
          <DialogHeader> Dialog Title </DialogHeader>
          <DialogBody> Dialog Body </DialogBody>
          <DialogFooter />
        </DialogContent>
      </ThemeProvider>
    </Dialog>

    <Button @click="handleVModelOpen">
      Open V-Model Dialog
    </Button>
    <Dialog v-model:open="open">
      <DialogContent class="w-100">
        <DialogHeader> Dialog Title </DialogHeader>
        <DialogBody> Dialog Body </DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>

    <Button @click="handleOpenDialog">
      Open Functional Dialog
    </Button> -->

    <Button @click="handleOpenOverlayDialog">
      Open Overlay Dialog
    </Button>
  </div>
</template>
