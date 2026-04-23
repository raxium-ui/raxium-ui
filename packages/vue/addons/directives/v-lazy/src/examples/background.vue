<script setup lang="ts">
import { vLazy } from '../index'
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-sm text-[#d0d0d0]">
      背景图（<code>v-lazy:background-image</code>），loading 支持 gradient
    </p>
    <div
      v-lazy:background-image="{
        src: 'http://iph.href.lu/320x144?text=Loaded',
        loading: 'http://iph.href.lu/320x144?text=Loading&bg=000088',
        error: 'http://iph.href.lu/320x144?text=Error&bg=aa0000',
      }"
      class="w-80 h-36 rounded border border-[#555555] bg-cover bg-center"
    />

    <p class="text-sm text-[#d0d0d0]">
      loading / error 均为
      <code>linear-gradient</code>（无效
      <code>src</code> 会先显示 loading 渐变，失败后显示 error 渐变）
    </p>
    <div
      v-lazy:background-image="{
        src: 'https://example.invalid/broken.png',
        loading:
          'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
        error:
          'linear-gradient(135deg, #2d132c 0%, #801336 50%, #c72c41 100%)',
      }"
      class="w-80 h-36 rounded border border-[#555555] bg-cover bg-center"
    />
  </div>
</template>
