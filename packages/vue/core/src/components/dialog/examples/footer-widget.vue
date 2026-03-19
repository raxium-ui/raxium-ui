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

const content = fakerEN.lorem.sentences(2)
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Footer widget props
      </Button>
    </DialogTrigger>
    <DialogContent class="w-120">
      <DialogHeader> Customize footer buttons </DialogHeader>
      <DialogBody>
        {{ content }}
      </DialogBody>
      <DialogFooter
        :widget="{
          cancel: { text: 'No', variant: 'text' },
          ok: { text: 'Yes', variant: 'normal' },
        }"
        :ui="{
          cancel: 'text-hff',
          ok: 'bg-rz-green text-black',
        }"
      />
    </DialogContent>
  </Dialog>
</template>
