<script setup lang="ts">
import { computed, ref } from 'vue'
import { Hotkey } from '../index'

const hotkey = ref('')
const lines = ref<string[]>([])

function push(line: string) {
  lines.value = [line, ...lines.value].slice(0, 8)
}

const joined = computed(() => (lines.value.length ? lines.value.join('\n') : '（暂无事件）'))
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Hotkey
      v-model:hotkey="hotkey"
      class="w-80"
      @focus="push('focus')"
      @blur="push('blur')"
      @error="(e) => push(`error: ${e?.message || 'unknown'}`)"
      @cancel="(codes, hk) => push(`cancel: [${codes.join(', ')}] -> ${hk}`)"
      @change="(codes, hk) => push(`change: [${codes.join(', ')}] -> ${hk}`)"
    />

    <div class="text-sm text-hcc">
      hotkey: <span class="text-hff">{{ hotkey || '(empty)' }}</span>
    </div>

    <pre class="w-full max-w-[560px] whitespace-pre-wrap rounded-md bg-h0f p-3 text-xs text-hcc">{{ joined }}</pre>
  </div>
</template>

