<script setup lang="ts">
import { Button } from '../../button'
import { useMessage } from '../index'

const { message } = useMessage()

function fakePromise() {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve('done'), 2500)
  })
}

function openPromise() {
  message.promise(
    fakePromise,
    {
      loading: {
        description: 'Loading...',
      },
      success: {
        description: 'Success!',
      },
      error: {
        description: 'Error!',
      },
    },
    {
      showClose: true,
      duration: 2000,
    },
  )
}
</script>

<template>
  <div class="flex items-center gap-3">
    <Button @click="openPromise">
      Message Promise
    </Button>
  </div>
</template>
