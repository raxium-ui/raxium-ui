<script setup lang="ts">
import { PinInput } from '../index'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-cc">With dash separator</span>
      <PinInput :count="4" separator="-" placeholder="○" />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-cc">6-digit OTP with separator</span>
      <PinInput :count="6" separator="·" otp placeholder="○" />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-cc">6-digit OTP with separator</span>
      <PinInput :count="6" otp>
        <template #separator="{ index }">
          <span v-if="index === 2" class="text-gray-cc">·</span>
        </template>
      </PinInput>
    </div>
  </div>
</template>
