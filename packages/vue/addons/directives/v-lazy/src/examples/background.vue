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
  </div>
</template>
