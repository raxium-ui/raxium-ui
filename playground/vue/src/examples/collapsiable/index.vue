<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ReadMore,
} from '@raxium/vue/components/collapsible'

const content = fakerEN.lorem.sentences(3)
const readMoreContent = fakerEN.lorem.sentences(10)
</script>

<template>
  <div class="flex items-center gap-2">
    <Collapsible class="flex-1">
      <CollapsibleTrigger>
        <div>trigger</div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>{{ content }}</p>
      </CollapsibleContent>
    </Collapsible>

    <ReadMore
      class="flex-1"
      :collapsed-height="100"
    >
      {{ readMoreContent }}
    </ReadMore>
  </div>
</template>
