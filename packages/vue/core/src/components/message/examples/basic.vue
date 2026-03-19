<script setup lang="ts">
import { Button } from '../../button'
import { useMessage } from '../index'

const { message } = useMessage()

function open(type: 'info' | 'success' | 'warning' | 'error' | 'loading') {
  message.create({
    type,
    description: `This is a ${type} message`,
    duration: type === 'loading' ? 10_000 : 2500,
    showClose: true,
  })
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button @click="open('info')">
      Info
    </Button>
    <Button @click="open('success')">
      Success
    </Button>
    <Button @click="open('warning')">
      Warning
    </Button>
    <Button @click="open('error')">
      Error
    </Button>
    <Button @click="open('loading')">
      Loading
    </Button>
  </div>
</template>

