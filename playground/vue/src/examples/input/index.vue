<script setup lang="ts">
import { Input } from '@raxium/vue/components/input'
</script>

<template>
  <div class="flex gap-4">
    <Input class="w-50" default-value="Default Value" />
    <Input class="w-50" placeholder="Placeholder" />
    <Input class="w-50" placeholder="Placeholder" clearable />
    <Input class="w-50" :maxlength="10" readonly default-value="1234567890" />
  </div>
</template>
