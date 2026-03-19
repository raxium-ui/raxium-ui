<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '../index'

const checked = ref(false)
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hff">
      checked: {{ checked }}
    </div>
    <Switch v-model:checked="checked" />
  </div>
</template>

