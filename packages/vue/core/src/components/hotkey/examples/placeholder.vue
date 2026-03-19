<script setup lang="ts">
import { ref } from 'vue'
import { Hotkey } from '../index'

const empty1 = ref('')
const empty2 = ref('')

function placeholderFn(focused: boolean) {
  return focused ? '请按下组合键（如 Ctrl + Shift + K）' : '未设置热键'
}
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Hotkey v-model:hotkey="empty1" class="w-80" placeholder="自定义占位文案" />
    <Hotkey v-model:hotkey="empty2" class="w-80" :placeholder="placeholderFn" />
  </div>
</template>
