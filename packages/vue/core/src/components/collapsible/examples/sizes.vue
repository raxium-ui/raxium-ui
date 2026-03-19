<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index'

const content = fakerEN.lorem.sentences(10)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Collapsible id="collapsible-sizes-xs" class="w-full" :theme="{ size: 'xs' }">
      <CollapsibleTrigger>
        <div class="text-hff">
          XS
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </CollapsibleContent>
    </Collapsible>
    <Collapsible id="collapsible-sizes-sm" class="w-full" :theme="{ size: 'sm' }">
      <CollapsibleTrigger>
        <div class="text-hff">
          Small
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </CollapsibleContent>
    </Collapsible>
    <Collapsible id="collapsible-sizes-base" class="w-full" :theme="{ size: 'base' }">
      <CollapsibleTrigger>
        <div class="text-hff">
          Base
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </CollapsibleContent>
    </Collapsible>
    <Collapsible id="collapsible-sizes-lg" class="w-full" :theme="{ size: 'lg' }">
      <CollapsibleTrigger>
        <div class="text-hff">
          Large
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
