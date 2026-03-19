<script setup lang="ts">
import { vLazy } from '../index'
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-sm text-[#d0d0d0]">
      基础用法（显式 bindType：<code>v-lazy:src</code>）
    </p>
    <img
      v-lazy:src="{
        src: 'http://iph.href.lu/240x160?text=Loaded3',
        loading: 'http://iph.href.lu/240x160?text=Loading&bg=000088',
        error: 'http://iph.href.lu/240x160?text=Error&bg=aa0000',
      }"
      class="w-60 h-40 rounded border border-[#555555] object-cover"
      alt="lazy"
    >
    <img
      v-lazy:src="{
        src: 'error.png',
        loading: 'http://iph.href.lu/240x160?text=Loading&bg=000088',
        error: 'http://iph.href.lu/240x160?text=Error&bg=aa0000',
      }"
      class="w-60 h-40 rounded border border-[#555555] object-cover"
      alt="lazy"
    >
  </div>
</template>
