<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index'

const content = fakerEN.lorem.sentences(10)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Collapsible class="w-full" default-open>
      <CollapsibleTrigger>
        <div class="text-sm text-hff">
          Default open
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </CollapsibleContent>
    </Collapsible>

    <Collapsible class="w-full" disabled>
      <CollapsibleTrigger>
        <div class="text-sm text-hff">
          Disabled (cannot toggle)
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
