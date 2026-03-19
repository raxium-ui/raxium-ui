<script setup lang="ts">
import { TagsInput as ArkTagsInput } from '@ark-ui/vue/tags-input'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import { TagsInput, TagsInputItem } from '../index'

const value = ref<string[]>(['vue', 'react'])

function validate(details: { value: string[], inputValue: string }) {
  const v = details.inputValue.trim()
  if (!v)
    return false
  if (v.length < 2)
    return false
  if (details.value.includes(v))
    return false
  return true
}
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hcc">
      max=3 + validate（去重、trim、最少 2 个字符）
    </div>

    <div class="w-full max-w-[560px] rounded-md border border-h33 p-3">
      <TagsInput v-model="value" :max="3" :validate="validate">
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

    <div class="text-xs text-h55">
      试试输入重复值、空格、或超过 3 个 tag；会触发 value-invalid 事件（见 Events 示例）。
    </div>
  </div>
</template>
