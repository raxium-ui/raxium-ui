<script setup lang="ts">
import { TagsInput as ArkTagsInput } from '@ark-ui/vue/tags-input'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import { TagsInput, TagsInputItem } from '../index'

const inlineValue = ref<string[]>(['VeryLongTag-1', 'VeryLongTag-2', 'VeryLongTag-3', 'VeryLongTag-4'])
const wrapValue = ref<string[]>(['Tag-A', 'Tag-B', 'Tag-C', 'Tag-D', 'Tag-E', 'Tag-F', 'Tag-G'])
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="w-full max-w-[560px] flex flex-col gap-3">
      <div class="text-sm text-hcc">
        inline=true（横向滚动）
      </div>
      <div class="rounded-md border border-h33 p-3">
        <TagsInput v-model="inlineValue" :inline="true">
          <template #default="{ items }">
            <TagsInputItem
              v-for="(v, index) in items"
              :key="`${v}-${index}`"
              :index="index"
              :value="v"
            />
          </template>
        </TagsInput>
      </div>

      <div class="text-sm text-hcc">
        inline=false（自动换行）
      </div>
      <div class="rounded-md border border-h33 p-3">
        <TagsInput v-model="wrapValue" :inline="false">
          <template #default="{ items }">
            <TagsInputItem
              v-for="(v, index) in items"
              :key="`${v}-${index}`"
              :index="index"
              :value="v"
            />
          </template>
        </TagsInput>
      </div>
    </div>
  </div>
</template>
