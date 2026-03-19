<script setup lang="ts">
import type { ToastOptions } from '../index'
import { Button } from '../../button'
import { useToast } from '../index'

const { toast } = useToast()

function create(options: ToastOptions) {
  toast.create({
    title: 'Hello, world!',
    description: 'This is a toast.',
    ...options,
  })
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button @click="() => create({ type: 'info' })">
      Info
    </Button>
    <Button @click="() => create({ type: 'success' })">
      Success
    </Button>
    <Button @click="() => create({ type: 'warning' })">
      Warning
    </Button>
    <Button @click="() => create({ type: 'error' })">
      Error
    </Button>
    <Button @click="() => create({ type: 'loading' })">
      Loading
    </Button>
    <Button variant="outline" @click="() => create({ theme: { size: 'xs' } })">
      size=xs
    </Button>
    <Button variant="outline" @click="() => create({ theme: { size: 'sm' } })">
      size=sm
    </Button>
    <Button variant="outline" @click="() => create({ theme: { size: 'base' } })">
      size=base
    </Button>
    <Button variant="outline" @click="() => create({ theme: { size: 'lg' }, duration: Infinity })">
      size=lg
    </Button>
  </div>
</template>
