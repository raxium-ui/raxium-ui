<script setup lang="tsx">
import { Button } from '../../button'
import { useToast } from '../index'

const { toast } = useToast()

function create() {
  toast.create({
    placement: 'top-end',
    type: 'success',
    title: 'Slots + ui',
    description: 'Custom icon / close / ui classes.',
  })
}

function createWithRender() {
  toast.create({
    placement: 'top-end',
    type: 'success',
    render: () => {
      return <div class="whitespace-nowrap">Hello, world!</div>
    },
  })
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Button :theme="{ size: 'sm' }" @click="create">
      Toast with slots
    </Button>
    <Button :theme="{ size: 'sm' }" @click="createWithRender">
      Toast with render function
    </Button>
  </div>
</template>
