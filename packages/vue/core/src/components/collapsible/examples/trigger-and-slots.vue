<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index'

const content = fakerEN.lorem.sentences(2)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Collapsible class="w-full">
      <CollapsibleTrigger :indicator="false">
        <template #default="{ open }">
          <div class="text-sm text-hff">
            Indicator disabled (open: {{ open }})
          </div>
        </template>
      </CollapsibleTrigger>
      <CollapsibleContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </CollapsibleContent>
    </Collapsible>

    <Collapsible class="w-full">
      <CollapsibleTrigger>
        <template #default="{ open }">
          <div class="text-sm text-hff">
            Custom indicator slot (open: {{ open }})
          </div>
        </template>
        <template #indicator="{ open }">
          <span class="text-xs text-hff">
            {{ open ? '▲' : '▼' }}
          </span>
        </template>
      </CollapsibleTrigger>
      <CollapsibleContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
