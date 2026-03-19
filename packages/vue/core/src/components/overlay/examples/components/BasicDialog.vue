<script lang="ts">
export interface BasicDialogProps {
  title: string
  content: string
}
</script>

<script setup lang="ts">
import { Dialog, DialogBody, DialogContent, DialogHeader } from '../../../dialog'

const { title, content } = defineProps<BasicDialogProps>()
</script>

<template>
  <Dialog>
    <DialogContent class="w-120">
      <DialogHeader> {{ title }} </DialogHeader>
      <DialogBody> {{ content }} </DialogBody>
    </DialogContent>
  </Dialog>
</template>
