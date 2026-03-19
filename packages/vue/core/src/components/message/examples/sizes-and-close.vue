<script setup lang="ts">
import { Button } from '../../button'
import { useMessage } from '../index'

const { message } = useMessage()

function open(size: 'xs' | 'sm' | 'base' | 'lg', showClose: boolean) {
  message.create({
    type: 'info',
    theme: { size },
    showClose,
    description: `size=${size}, showClose=${showClose}`,
    duration: 3000,
  })
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button variant="outline" @click="open('xs', true)">
      xs + close
    </Button>
    <Button variant="outline" @click="open('sm', true)">
      sm + close
    </Button>
    <Button variant="outline" @click="open('base', true)">
      base + close
    </Button>
    <Button variant="outline" @click="open('lg', true)">
      lg + close
    </Button>
    <Button variant="text" @click="open('base', false)">
      no close
    </Button>
  </div>
</template>
