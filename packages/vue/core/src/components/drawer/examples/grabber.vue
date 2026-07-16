<script setup lang="ts">
import { Button } from '../../button'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerGrabber,
  DrawerHeader,
  DrawerTrigger,
} from '../index'
</script>

<template>
  <Drawer side="bottom">
    <DrawerTrigger as-child>
      <Button class="w-fit">
        Open bottom sheet
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerGrabber />
      <DrawerHeader>Swipe to dismiss</DrawerHeader>
      <DrawerBody>
        Drag the grabber or swipe down to close. Backdrop / close button also work.
      </DrawerBody>
    </DrawerContent>
  </Drawer>
</template>
