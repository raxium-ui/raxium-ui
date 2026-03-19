<script setup lang="ts">
import { computed, ref } from 'vue'
import { RatingGroup, RatingGroupItem } from '../index'

const value = ref<number>(3)
const lines = ref<string[]>([])

function push(line: string) {
  lines.value = [line, ...lines.value].slice(0, 8)
}

const joined = computed(() => (lines.value.length ? lines.value.join('\n') : '（暂无事件）'))
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hcc">
      监听：value-change / hover-change
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <RatingGroup
        v-model="value"
        :count="5"
        @value-change="(d) => push(`value-change: ${d.value}`)"
        @hover-change="(d) => push(`hover-change: ${d.hoveredValue}`)"
      >
        <template #default="{ items }">
          <RatingGroupItem v-for="item in items" :key="item" :index="item" />
        </template>
      </RatingGroup>
    </div>

    <pre class="w-full max-w-[520px] whitespace-pre-wrap rounded-md bg-h0f p-3 text-xs text-hcc">{{ joined }}</pre>
  </div>
</template>

