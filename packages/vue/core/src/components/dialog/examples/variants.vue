<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { THEME_SIZE } from '@raxium/shared/constant'
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../index'

const content = fakerEN.lorem.sentences(3)
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Dialog
      v-for="size in THEME_SIZE"
      :key="size"
      :theme="{ size }"
    >
      <DialogTrigger as-child>
        <Button :theme="{ size }" variant="outlined">
          {{ size }}
        </Button>
      </DialogTrigger>
      <DialogContent class="w-110">
        <DialogHeader>{{ size }} Dialog</DialogHeader>
        <DialogBody>{{ content }}</DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  </div>
</template>
