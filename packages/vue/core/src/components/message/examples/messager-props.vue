<script setup lang="ts">
import type { MessagerExpose } from '../index'
import { useTemplateRef } from 'vue'
import { Button } from '../../button'
import { Message, Messager } from '../index'

const messagerRef = useTemplateRef<MessagerExpose>('messager')

function open() {
  messagerRef.value?.messager.create({
    type: 'info',
    description: 'This message is rendered by a local <Messager />',
    duration: 4000,
    showClose: true,
    meta: { source: 'local' },
  } as any)
}
</script>

<template>
  <div class="flex items-center gap-3">
    <Button @click="open">
      Open (local Messager)
    </Button>
    <span class="text-sm text-hff">max=3, overlap=false, gap=8</span>
  </div>

  <Messager
    ref="messager"
    v-slot="{ message }"
    :max="3"
    :overlap="false"
    :gap="8"
    :duration="2500"
  >
    <Message
      :options="message"
      :ui="{
        content: 'border border-rz-green',
        description: 'text-hff',
      }"
    />
  </Messager>
</template>
