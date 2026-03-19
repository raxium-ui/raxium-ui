<script setup lang="ts">
import { Input } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Input class="w-60" placeholder="Clearable" clearable />
    <Input class="w-60" placeholder="Disabled" disabled />
    <Input class="w-60" placeholder="Readonly" readonly default-value="1234567890" :maxlength="10" />
  </div>
</template>

