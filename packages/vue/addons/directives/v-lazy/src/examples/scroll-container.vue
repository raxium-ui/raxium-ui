<script setup lang="ts">
import { vLazy } from '../index'

const srcs = Array.from({ length: 8 }, (_, i) => ({
  src: `http://iph.href.lu/240x160?text=Loaded${i}`,
  loading: `http://iph.href.lu/240x160?text=Loading&bg=000088`,
  error: `http://iph.href.lu/240x160?text=Error&bg=aa0000`,
}))
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-sm text-[#d0d0d0]">
      自定义滚动容器：<code>v-lazy.scroller:src</code>（modifier 名即容器 ref）
    </p>

    <div class="h-52 w-80 overflow-auto rounded border border-[#555555] p-3">
      <div class="flex flex-col gap-6">
        <img
          v-for="(src, i) in srcs"
          :key="i"
          v-lazy="src"
          class="w-full h-28 rounded border border-[#555555] object-cover"
          :alt="`lazy-${i}`"
        >
      </div>
    </div>
  </div>
</template>
