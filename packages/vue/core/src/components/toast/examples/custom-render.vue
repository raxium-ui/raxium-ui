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
            {context.type}
          </p>
          <ToastCloseTrigger>
            <button class="text-sm underline">Close</button>
          </ToastCloseTrigger>
        </div>
      )
    },
  })
}

// Pass per-toast `props` (2nd arg) to customize the <Toast> instance for this call only.
function createWithProps() {
  toast.create(
    {
      placement: 'top-end',
      title: 'With custom props',
      description: 'This toast overrides theme.size and adds a class per call.',
    },
    {
      theme: { size: 'lg' },
      ui: {
        content: 'bg-white',
        title: 'font-bold uppercase tracking-wide text-black',
        description: 'italic text-black',
        close: 'text-black',
      },
    },
  )
}

// `update` also accepts a `props` argument. Passed props are merged onto
// any existing per-toast props for the same id.
function createThenUpdate() {
  const result = toast.create(
    {
      placement: 'top-end',
      title: 'Updating soon...',
    },
    { class: 'ring-2 ring-warning' },
  )
  if (!result)
    return
  const { toastId, toaster } = result
  setTimeout(() => {
    toaster.update(
      toastId,
      { title: 'Updated!', description: 'props merged with the previous ones', duration: 3000 },
      {
        class: 'ring-none',
        ui: {
          content: 'bg-white',
          title: 'font-bold uppercase tracking-wide text-black',
          description: 'italic text-black',
          close: 'text-black',
        },
      },
    )
  }, 1000)
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <Button @click="create">
        Custom render
      </Button>
      <Button @click="createWithProps">
        Create with props
      </Button>
      <Button @click="createThenUpdate">
        Create then update props
      </Button>
    </div>

    <ToasterManager ref="manager">
      <Toaster
        v-slot="{ toast: toastOptions, props }"
        toaster-id="top-end"
        placement="top-end"
        overlap
      >
        <Toast
          :options="toastOptions"
          v-bind="props"
        />
      </Toaster>
    </ToasterManager>
  </div>
</template>
