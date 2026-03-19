<script setup lang="ts">
import { vLazy } from '../index'
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-sm text-[#d0d0d0]">
      src 数组用法
    </p>
    <img
      v-lazy="{
        src: [
          'http://iph.href.lu/240x160?text=Loaded0',
          'http://iph.href.lu/240x160?text=Loaded1',
        ],
        loading: 'http://iph.href.lu/240x160?text=Loading&bg=000088',
        error: 'http://iph.href.lu/240x160?text=Error&bg=aa0000',
      }"
      class="w-60 h-40 rounded border border-[#555555] object-cover"
      alt="array-src"
    >
    <img
      v-lazy="{
        src: [
          'error.png',
          'http://iph.href.lu/240x160?text=Loaded1',
        ],
        loading: 'http://iph.href.lu/240x160?text=Loading&bg=000088',
        error: 'http://iph.href.lu/240x160?text=Error&bg=aa0000',
      }"
      class="w-60 h-40 rounded border border-[#555555] object-cover"
      alt="array-src"
    >
  </div>
</template>
