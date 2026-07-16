<script setup lang="ts">
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../../dialog'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '../index'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button>Open Drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>Drawer + Dialog depth</DrawerHeader>
      <DrawerBody class="flex flex-col gap-4">
        <p class="text-sm opacity-75">
          Drawer and Dialog share the modal depth band. Opening a Dialog from inside
          should stack above this panel without z-index fighting.
        </p>
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outlined">
              Open Dialog on top
            </Button>
          </DialogTrigger>
          <DialogContent class="w-96">
            <DialogHeader>Nested Dialog</DialogHeader>
            <DialogBody>
              This dialog should sit above the drawer backdrop and content.
            </DialogBody>
          </DialogContent>
        </Dialog>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
</template>
