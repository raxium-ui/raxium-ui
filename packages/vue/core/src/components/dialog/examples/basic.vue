<script setup lang="ts">
import { Button } from '../../button'
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
  <Dialog>
    <DialogTrigger as-child>
      <Button class="w-fit">
        Open Dialog
      </Button>
    </DialogTrigger>
    <DialogContent class="w-120">
      <DialogHeader> Dialog Title </DialogHeader>
      <DialogBody> Dialog Body </DialogBody>
      <DialogFooter />
    </DialogContent>
  </Dialog>

  <Dialog>
    <DialogTrigger as-child>
      <Button class="w-fit">
        Open Razer Dialog
      </Button>
    </DialogTrigger>
    <DialogContent
      class="w-120"
      :theme="{ surface: 'razer' }"
    >
      <DialogHeader> Dialog Title </DialogHeader>
      <DialogBody> Dialog Body </DialogBody>
      <DialogFooter />
    </DialogContent>
  </Dialog>

  <Dialog
    :lazy-mount="false"
    :unmount-on-exit="false"
  >
    <DialogTrigger as-child>
      <Button class="w-fit">
        Open input dialog
      </Button>
    </DialogTrigger>
    <DialogContent class="w-120">
      <DialogHeader> Dialog Title </DialogHeader>
      <DialogBody>
        <input
          type="text"
          class="w-full"
        >
      </DialogBody>
      <DialogFooter />
    </DialogContent>
  </Dialog>
</template>
