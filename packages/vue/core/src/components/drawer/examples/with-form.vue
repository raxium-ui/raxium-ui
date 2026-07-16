<script setup lang="ts">
import { Button } from '../../button'
import { Input } from '../../input'
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
        Edit profile
      </Button>
    </DrawerTrigger>
    <DrawerContent class="w-md">
      <DrawerHeader>Edit profile</DrawerHeader>
      <DrawerBody class="flex flex-col gap-4">
        <label class="flex flex-col gap-1 text-sm">
          <span>Name</span>
          <Input placeholder="Display name" />
        </label>
        <label class="flex flex-col gap-1 text-sm">
          <span>Email</span>
          <Input
            type="email"
            placeholder="you@example.com"
          />
        </label>
      </DrawerBody>
      <DrawerFooter
        :widget="{
          cancel: { text: 'Cancel' },
          ok: { text: 'Save' },
        }"
      />
    </DrawerContent>
  </Drawer>
</template>
