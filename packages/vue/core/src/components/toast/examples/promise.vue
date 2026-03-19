<script setup lang="ts">
import { Button } from '../../button'
import { useToast } from '../index'

const { toast } = useToast()

function fakePromise() {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve('Done'), 1500)
  })
}

function run() {
  toast.promise(
    fakePromise,
    {
      loading: {
        title: 'Loading...',
        description: 'Waiting for promise',
      },
      success: {
        title: 'Success!',
        description: 'Promise resolved',
      },
      error: {
        title: 'Error!',
        description: 'Promise rejected',
      },
    },
    {
      placement: 'top-end',
    },
  )
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Button :theme="{ size: 'sm' }" @click="run">
      Toast promise
    </Button>
  </div>
</template>
