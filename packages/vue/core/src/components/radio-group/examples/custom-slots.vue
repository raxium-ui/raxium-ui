<script setup lang="ts">
import { Icon } from '../../icon'
import { RadioGroup, RadioGroupItem } from '../index'
</script>

<template>
  <RadioGroup default-value="b">
    <RadioGroupItem value="a">
      <template #control="{ checked }">
        <div class="flex items-center justify-center size-4 rounded-full border border-gray-55">
          <Icon v-if="checked" icon="lucide:dot" class="text-rz-green" />
        </div>
      </template>
      <template #default="{ checked }">
        <span class="text-sm" :class="checked ? 'text-gray-ff' : 'text-gray-cc'">Custom A</span>
      </template>
    </RadioGroupItem>

    <RadioGroupItem value="b">
      <template #control="{ checked }">
        <div class="flex items-center justify-center size-4 rounded border border-gray-55">
          <Icon v-if="checked" icon="lucide:check" class="text-rz-green" />
        </div>
      </template>
      <template #default="{ checked }">
        <span class="text-sm" :class="checked ? 'text-gray-ff' : 'text-gray-cc'">Custom B</span>
      </template>
    </RadioGroupItem>
  </RadioGroup>
</template>
