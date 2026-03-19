<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { ReadMore } from '../index'

const content = fakerEN.lorem.sentences(20)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <ReadMore
      id="read-more-default"
      :collapsed-height="60"
    >
      <p class="text-sm text-hcc">
        {{ content }}
      </p>
    </ReadMore>

    <ReadMore
      id="read-more-customized"
      :collapsed-height="60"
      :text="{ more: '展开更多', less: '收起' }"
      :ui="{ trigger: 'text-sm text-rz-green', content: 'text-hcc' }"
    >
      <p class="text-sm">
        {{ content }}
      </p>
    </ReadMore>
  </div>
</template>
