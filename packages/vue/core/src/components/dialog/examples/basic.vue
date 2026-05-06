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
</template>
