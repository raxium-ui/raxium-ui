<script setup lang="ts">
import type { ToasterManagerExpose } from '../index'
import { ref, watch } from 'vue'
import { Button } from '../../button'
import { Toast, Toaster, ToasterManager, useToast } from '../index'

const manager = ref<ToasterManagerExpose>()
watch(manager, (newVal) => {
  console.log('manager', newVal)
})
const { toast } = useToast(manager)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <Button @click="() => toast.create({ title: 'Top end', description: 'placement=top-end', placement: 'top-end' })">
        top-end
      </Button>
      <Button @click="() => toast.create({ title: 'Top start', description: 'placement=top-start', placement: 'top-start' })">
        top-start
      </Button>
      <Button @click="() => toast.create({ title: 'Bottom end', description: 'placement=bottom-end', placement: 'bottom-end' })">
        bottom-end
      </Button>
      <Button @click="() => toast.create({ title: 'Bottom start', description: 'placement=bottom-start', placement: 'bottom-start' })">
        bottom-start
      </Button>
    </div>

    <ToasterManager ref="manager">
      <Toaster v-slot="{ toast: toastOptions }" toaster-id="top-end" placement="top-end" overlap>
        <Toast :options="toastOptions" />
      </Toaster>
      <Toaster v-slot="{ toast: toastOptions }" toaster-id="top-start" placement="top-start" overlap>
        <Toast :options="toastOptions" />
      </Toaster>
      <Toaster v-slot="{ toast: toastOptions }" toaster-id="bottom-start" placement="bottom-start" overlap>
        <Toast :options="toastOptions" />
      </Toaster>
    </ToasterManager>
  </div>
</template>
