<script setup lang="ts">
import { ref } from 'vue'
import { TagsInput, TagsInputItem } from '../index'

const value = ref<string[]>(['Vue', 'React'])
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      values:
      <span class="text-hff">{{ value.length ? value.join(', ') : '(empty)' }}</span>
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <TagsInput v-model="value">
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
</template>

