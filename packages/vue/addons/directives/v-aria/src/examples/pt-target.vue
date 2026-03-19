<script setup lang="ts">
import vAria from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <p class="text-sm text-[#d0d0d0]">
      使用 <code>pt</code> 把 aria/role/tabindex 应用到指定子元素（querySelector）
    </p>

    <div
      v-aria:0="{
        pt: '.target',
        role: 'button',
        label: 'Target is the inner element',
      }"
      class="rounded border border-[#555555] p-3"
    >
      <div class="text-xs text-[#d0d0d0]">
        wrapper (not focusable)
      </div>
      <div class="target mt-2 w-fit rounded bg-[#2a2a2a] px-3 py-2 text-sm text-white">
        inner (.target) is focusable
      </div>
    </div>
  </div>
</template>

