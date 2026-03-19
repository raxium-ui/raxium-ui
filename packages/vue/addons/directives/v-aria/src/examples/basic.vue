<script setup lang="ts">
import { ref } from 'vue'
import vAria from '../index'

const logs = ref<string[]>([])
function onAction() {
  logs.value = [`Enter pressed at ${new Date().toLocaleTimeString()}`, ...logs.value].slice(0, 4)
}
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <p class="text-sm text-[#d0d0d0]">
      给非原生可交互元素补齐 aria / role / tabindex，并支持 Enter 触发 action
    </p>

    <div
      v-aria:0.stop="{
        role: 'button',
        label: 'Press Enter to trigger action',
        action: onAction,
      }"
      class="w-fit select-none rounded border border-[#555555] bg-[#2a2a2a] px-3 py-2 text-sm text-white"
    >
      Focus me then press Enter
    </div>

    <div class="text-xs text-[#d0d0d0]">
      <div v-for="(line, i) in logs" :key="i">
        {{ line }}
      </div>
    </div>
  </div>
</template>

