<script setup lang="ts">
import { TagsInput as ArkTagsInput } from '@ark-ui/vue/tags-input'
import { X } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { TagsInput, TagsInputItem } from '../index'

const value = ref<string[]>(['vue', 'react'])
const lines = ref<string[]>([])

function push(line: string) {
  lines.value = [line, ...lines.value].slice(0, 8)
}

const joined = computed(() => (lines.value.length ? lines.value.join('\n') : '（暂无事件）'))
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hcc">
      监听：value-change / highlight-change / value-invalid
    </div>

    <div class="w-full max-w-[560px] rounded-md border border-h33 p-3">
      <TagsInput
        v-model="value"
        :max="3"
        @value-change="(d) => push(`value-change: [${d.value.join(', ')}]`)"
        @highlight-change="(d) => push(`highlight-change: ${d.highlightedValue ?? 'null'}`)"
        @value-invalid="(d) => push(`value-invalid: ${d.reason}`)"
      >
        <template #default="{ items }">
          <TagsInputItem
            v-for="(v, index) in items"
            :key="`${v}-${index}`"
            :index="index"
            :value="v"
          >
            <ArkTagsInput.ItemDeleteTrigger class="ml-1 text-h55 hover:text-hff">
              <X class="size-3.5" />
            </ArkTagsInput.ItemDeleteTrigger>
          </TagsInputItem>
        </template>
      </TagsInput>
    </div>

    <pre class="w-full max-w-[560px] whitespace-pre-wrap rounded-md bg-h0f p-3 text-xs text-hcc">{{ joined }}</pre>
  </div>
</template>
