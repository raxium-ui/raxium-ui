<script setup lang="tsx">
import type { ToastOptions } from '@raxium/vue/components/toast'
import { Button } from '@raxium/vue/components/button'
import { useMessage } from '@raxium/vue/components/message'
import { ToastCloseTrigger, useToast } from '@raxium/vue/components/toast'

const { toast } = useToast()
const { message } = useMessage()

function handleToast({
  size = 'base',
  type = 'info',
  placement,
}: ToastOptions = {}) {
  toast.create({
    title: 'Hello, world!',
    description: 'This is a toast',
    size,
    type,
    placement,
  })
}

function handleToastCustomRender() {
  toast.create({
    render: (context) => {
      return (
        <div class="w-max flex items-center gap-2">
          <p>
            This is a custom toast render, type:
            {context.type}
          </p>
          <ToastCloseTrigger>
            <button>Close</button>
          </ToastCloseTrigger>
        </div>
      )
    },
  })
}

function fakePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 5000)
  })
}
function handleToastPromise() {
  toast.promise(
    fakePromise,
    {
      loading: {
        title: 'Loading...',
        description: 'This Loading Fake Promise',
      },
      success: {
        title: 'Success!',
        description: 'This Success Fake Promise',
      },
      error: {
        title: 'Error!',
        description: 'This Error Fake Promise',
      },
    },
    {
      placement: 'top-end',
    },
  )
}

function handleMessage() {
  message.create({
    description: 'This is a message',
    size: 'base',
    type: 'info',
  })
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Button @click="() => handleToast()">
      Toast
    </Button>
    <Button
      @click="
        () =>
          handleToast({
            size: 'sm',
            type: 'success',
          })
      "
    >
      Toast Small
    </Button>
    <Button
      @click="
        () =>
          handleToast({
            size: 'lg',
            type: 'error',
            placement: 'top-end',
          })
      "
    >
      Toast Large
    </Button>
    <Button @click="handleToastPromise">
      Toast Promise
    </Button>
    <Button @click="handleToastCustomRender">
      Toast custom render
    </Button>

    <Button @click="handleMessage">
      Message
    </Button>
  </div>
</template>
