<script setup lang="ts">
import { ref } from 'vue'
import { NumberInput } from '../index'

const price = ref('1234.5')
const percent = ref('0.25')
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="w-full max-w-[520px] flex flex-col gap-3">
      <div class="text-sm text-hcc">
        locale + formatOptions（currency）
      </div>
      <div class="rounded-md border border-h33 p-3">
        <NumberInput
          v-model="price"
          show-trigger
          locale="zh-CN"
          :format-options="{ style: 'currency', currency: 'CNY' }"
          :min="0"
          :step="1"
        />
      </div>

      <div class="text-sm text-hcc">
        clampValueOnBlur=false（允许暂时输入超范围）
      </div>
      <div class="rounded-md border border-h33 p-3">
        <NumberInput
          v-model="percent"
          show-trigger
          :min="0"
          :max="1"
          :step="0.05"
          :clamp-value-on-blur="false"
        />
      </div>
    </div>
  </div>
</template>

