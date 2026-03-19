<script lang="ts" setup>
import { ref } from 'vue'
import { Checkbox } from '../index'

const checked = ref(false)
</script>

<template>
  <!-- id 是因为在story doc 中渲染多个组件时，需要有唯一的 id来使浏览器默认form行为进行区分 -->
  <Checkbox
    v-model:checked="checked"
    label="Checkbox"
  />
</template>
