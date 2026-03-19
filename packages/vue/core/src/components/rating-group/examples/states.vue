<script setup lang="ts">
import { RatingGroup, RatingGroupItem } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="w-full max-w-[520px] flex flex-col gap-3">
      <div class="text-sm text-hcc">
        Disabled
      </div>
      <div class="rounded-md border border-h33 p-3">
        <RatingGroup :default-value="3" disabled :count="5">
          <template #default="{ items }">
            <RatingGroupItem v-for="item in items" :key="item" :index="item" />
          </template>
        </RatingGroup>
      </div>

      <div class="text-sm text-hcc">
        ReadOnly
      </div>
      <div class="rounded-md border border-h33 p-3">
        <RatingGroup :default-value="4" read-only :count="5">
          <template #default="{ items }">
            <RatingGroupItem v-for="item in items" :key="item" :index="item" />
          </template>
        </RatingGroup>
      </div>
    </div>
  </div>
</template>

