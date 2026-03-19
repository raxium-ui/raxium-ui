<script lang="ts" setup>
import { Checkbox } from '../index'
</script>

<template>
  <!-- id 是因为在story doc 中渲染多个组件时，需要有唯一的 id来使浏览器默认form行为进行区分 -->
  <div class="w-full flex items-center gap-6">
    <Checkbox
      :theme="{ size: 'xs' }"
      label="XS"
    />
    <Checkbox
      :theme="{ size: 'sm' }"
      label="Small"
    />
    <Checkbox
      :theme="{ size: 'base' }"
      label="Base"
    />
    <Checkbox
      :theme="{ size: 'lg' }"
      label="Large"
    />
    <Checkbox
      :theme="{ size: 'lg' }"
      label="Large (disabled)"
      disabled
    />
  </div>
</template>
