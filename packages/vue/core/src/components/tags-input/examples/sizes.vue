<script setup lang="ts">
import { TagsInput as ArkTagsInput } from '@ark-ui/vue/tags-input'
import { THEME_SIZE } from '@raxium/shared/constant'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import { TagsInput, TagsInputItem } from '../index'

const value = ref<string[]>(['Vue', 'React'])
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hcc">
      xs / sm / base / lg
    </div>

    <div class="w-full max-w-[560px] flex flex-col gap-3">
      <div v-for="size in THEME_SIZE" :key="size" class="rounded-md border border-h33 p-3">
        <TagsInput v-model="value" :theme="{ size }">
          <template #default="{ items }">
            <TagsInputItem
              v-for="(v, index) in items"
              :key="`${v}-${index}`"
              :index="index"
              :value="v"
            >
              <ArkTagsInput.ItemDeleteTrigger class="ml-1 text-h55 hover:text-hff">
                <X class="size-3" />
              </ArkTagsInput.ItemDeleteTrigger>
            </TagsInputItem>
          </template>
        </TagsInput>
      </div>
    </div>
  </div>
</template>
