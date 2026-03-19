<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { ref } from 'vue'
import { RatingGroup, RatingGroupItem } from '../index'

const value = ref<number>(3)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hcc">
      xs / sm / base / lg
    </div>

    <div class="w-full max-w-[520px] flex flex-col gap-3 rounded-md border border-h33 p-3">
      <RatingGroup
        v-for="size in THEME_SIZE"
        :key="size"
        v-model="value"
        :theme="{ size }"
        :count="5"
      >
        <template #default="{ items }">
          <RatingGroupItem v-for="item in items" :key="item" :index="item" />
        </template>
      </RatingGroup>
    </div>
  </div>
</template>
