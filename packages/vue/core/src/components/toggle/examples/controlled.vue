<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { Toggle } from '../index'

const pressed = ref(false)
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <Button variant="outline" @click="pressed = false">
        Set off
      </Button>
      <Button variant="outline" @click="pressed = true">
        Set on
      </Button>
      <span class="text-sm text-hff">pressed: {{ pressed }}</span>
    </div>

    <Toggle v-model:pressed="pressed">
      Controlled toggle
    </Toggle>
  </div>
</template>
