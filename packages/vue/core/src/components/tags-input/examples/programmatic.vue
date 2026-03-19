<script setup lang="ts">
import { TagsInput as ArkTagsInput } from '@ark-ui/vue/tags-input'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import { Button } from '../../button'
import { TagsInput, TagsInputItem } from '../index'

const value = ref<string[]>(['vue', 'react'])
const tagsRef = ref<any>(null)
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="outline" @click="tagsRef?.$api?.focus()">
        Focus
      </Button>
      <Button variant="outline" @click="tagsRef?.$api?.addValue('solid')">
        Add solid
      </Button>
      <Button variant="outline" @click="tagsRef?.$api?.setValue(['vue', 'svelte'])">
        Set [vue, svelte]
      </Button>
      <Button variant="outline" @click="tagsRef?.$api?.clearValue()">
        Clear
      </Button>
      <div class="text-sm text-hcc">
        value: <span class="text-hff">{{ value.join(', ') || '(empty)' }}</span>
      </div>
    </div>

    <div class="w-full max-w-[560px] rounded-md border border-h33 p-3">
      <TagsInput ref="tagsRef" v-model="value">
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
</template>
