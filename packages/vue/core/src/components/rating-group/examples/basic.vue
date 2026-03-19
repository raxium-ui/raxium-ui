<script setup lang="ts">
import { ref } from 'vue'
import { RatingGroup, RatingGroupItem } from '../index'

const value = ref<number>(3)
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      value: <span class="text-hff">{{ value }}</span>
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <RatingGroup
        v-model="value"
        :count="5"
      >
        <template #default="{ items }">
          <RatingGroupItem
            v-for="item in items"
            :key="item"
            :index="item"
          />
        </template>
      </RatingGroup>
    </div>
  </div>
</template>
