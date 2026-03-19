<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { RatingGroup, RatingGroupItem } from '../index'

const value = ref<number>(3)
const ratingRef = ref<any>(null)
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="outline" @click="ratingRef?.$api?.setValue(1)">
        Set 1
      </Button>
      <Button variant="outline" @click="ratingRef?.$api?.setValue(3)">
        Set 3
      </Button>
      <Button variant="outline" @click="ratingRef?.$api?.setValue(5)">
        Set 5
      </Button>
      <Button variant="outline" @click="ratingRef?.$api?.clearValue()">
        Clear
      </Button>
      <div class="text-sm text-hcc">
        value: <span class="text-hff">{{ value }}</span>
      </div>
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <RatingGroup ref="ratingRef" v-model="value" :count="5">
        <template #default="{ items }">
          <RatingGroupItem v-for="item in items" :key="item" :index="item" />
        </template>
      </RatingGroup>
    </div>
  </div>
</template>
