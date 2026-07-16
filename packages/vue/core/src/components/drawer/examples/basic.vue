<script setup lang="ts">
import { Button } from '../../button'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '../index'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button class="w-fit">
        Open Drawer
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>Drawer Title</DrawerHeader>
      <DrawerBody>
        Right-edge drawer for navigation or forms.
      </DrawerBody>
      <DrawerFooter />
    </DrawerContent>
  </Drawer>
</template>
