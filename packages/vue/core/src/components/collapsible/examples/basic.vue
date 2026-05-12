<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index'

const content = fakerEN.lorem.sentences(10)
</script>

<template>
  <Collapsible class="w-full">
    <CollapsibleTrigger>
      <div class="text-sm text-gray-ff">
        Trigger
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent class="mt-2">
      <p class="text-sm text-gray-cc">
        {{ content }}
      </p>
    </CollapsibleContent>
  </Collapsible>
</template>
