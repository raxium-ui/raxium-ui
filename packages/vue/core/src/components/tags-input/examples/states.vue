<script setup lang="ts">
import { TagsInput as ArkTagsInput } from '@ark-ui/vue/tags-input'
import { X } from 'lucide-vue-next'
import { TagsInput, TagsInputItem } from '../index'

const preset = ['Vue', 'React', 'Solid']
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="w-full max-w-[560px] flex flex-col gap-3">
      <div class="text-sm text-hcc">
        Disabled
      </div>
      <div class="rounded-md border border-h33 p-3">
        <TagsInput :default-value="preset" disabled>
          <template #default="{ items }">
            <TagsInputItem
              v-for="(v, index) in items"
              :key="`${v}-${index}`"
              :index="index"
              :value="v"
            >
              <ArkTagsInput.ItemDeleteTrigger class="ml-1 text-h55">
                <X class="size-3.5" />
              </ArkTagsInput.ItemDeleteTrigger>
            </TagsInputItem>
          </template>
        </TagsInput>
      </div>

      <div class="text-sm text-hcc">
        ReadOnly
      </div>
      <div class="rounded-md border border-h33 p-3">
        <TagsInput :default-value="preset" read-only>
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
        Invalid（仅展示状态）
      </div>
      <div class="rounded-md border border-h33 p-3">
        <TagsInput :default-value="preset" invalid>
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
    </div>
  </div>
</template>
