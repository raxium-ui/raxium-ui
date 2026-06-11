<script setup lang="ts">
import { PinInput } from '../index'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-cc">Default</span>
      <PinInput :count="4" placeholder="○" />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-cc">Disabled</span>
      <PinInput :count="4" disabled placeholder="○" />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-cc">Invalid</span>
      <PinInput :count="4" invalid placeholder="○" />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-cc">Read Only</span>
      <PinInput :count="4" :default-value="['1', '2', '3', '4']" read-only />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-cc">Masked (password)</span>
      <PinInput :count="4" mask placeholder="○" />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-cc">OTP (autocomplete)</span>
      <PinInput :count="6" otp placeholder="○" />
    </div>
  </div>
</template>
