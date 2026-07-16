<script setup lang="ts">
import type { DrawerSide } from '../props'
import { Button } from '../../button'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '../index'

const sides: DrawerSide[] = ['left', 'right', 'top', 'bottom']
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-3">
    <Drawer
      v-for="side in sides"
      :key="side"
      :side="side"
    >
      <DrawerTrigger as-child>
        <Button variant="outlined">
          {{ side }}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>{{ side }} Drawer</DrawerHeader>
        <DrawerBody>
          Panel slides in from the {{ side }} edge.
        </DrawerBody>
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  </div>
</template>
