<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../index'

const content = fakerEN.lorem.paragraphs(8)
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="w-fit" variant="outline">
        Scrollable body
      </Button>
    </DialogTrigger>
    <DialogContent class="w-140">
      <DialogHeader> Scrollable Dialog </DialogHeader>
      <DialogBody class="h-50">
        <p class="whitespace-pre-wrap text-sm text-hcc">
          {{ content }}
        </p>
      </DialogBody>
      <DialogFooter />
    </DialogContent>
  </Dialog>
</template>
