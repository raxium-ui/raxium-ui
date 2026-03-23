<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../index'

const content = fakerEN.lorem.sentences(6)
</script>

<template>
  <Accordion id="accordion-basic" class="w-full flex flex-col gap-2">
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <div class="text-sm text-hff">
          Section 1
        </div>
      </AccordionTrigger>
      <AccordionContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>
        <div class="text-sm text-hff">
          Section 2
        </div>
      </AccordionTrigger>
      <AccordionContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>
        <div class="text-sm text-hff">
          Section 3
        </div>
      </AccordionTrigger>
      <AccordionContent class="mt-2">
        <p class="text-sm text-hcc">
          {{ content }}
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
