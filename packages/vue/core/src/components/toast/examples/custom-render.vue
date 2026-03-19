<script setup lang="tsx">
import type { ToasterManagerExpose } from '../index'
import { useTemplateRef } from 'vue'
import { Button } from '../../button'
import { Toast, ToastCloseTrigger, Toaster, ToasterManager, useToast } from '../index'

const manager = useTemplateRef<ToasterManagerExpose>('manager')
const { toast } = useToast(manager)

function create() {
  toast.create({
    placement: 'top-end',
    render: (context) => {
      return (
        <div class="w-max flex items-center gap-2">
          <p class="text-sm">
            Custom toast render, type:
            {' '}
            {context.type}
          </p>
          <ToastCloseTrigger>
            <button class="text-sm underline">
              Close
            </button>
          </ToastCloseTrigger>
        </div>
      )
    },
  })
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Button @click="create">
      Custom render
    </Button>

    <ToasterManager ref="manager">
      <Toaster v-slot="{ toast: toastOptions }" toaster-id="top-end" placement="top-end" overlap>
        <Toast :options="toastOptions" />
      </Toaster>
    </ToasterManager>
  </div>
</template>
