<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../index'

const content = fakerEN.lorem.sentences(2)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Accordion
      id="accordion-trigger-no-indicator"
      class="w-full flex flex-col gap-2"
      collapsible
    >
      <AccordionItem value="no-ind">
        <AccordionTrigger :indicator="false">
          <template #default="{ open }">
            <div class="text-sm text-gray-ff">
              Indicator disabled (open: {{ open }})
            </div>
          </template>
        </AccordionTrigger>
        <AccordionContent class="mt-2">
          <p class="text-sm text-gray-cc">
            {{ content }}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <Accordion
      id="accordion-trigger-custom-indicator"
      class="w-full flex flex-col gap-2"
      collapsible
    >
      <AccordionItem value="custom">
        <AccordionTrigger>
          <template #default="{ open }">
            <div class="text-sm text-gray-ff">
              Custom indicator slot (open: {{ open }})
            </div>
          </template>
          <template #indicator="{ open }">
            <span class="text-xs text-gray-ff">
              {{ open ? '▲' : '▼' }}
            </span>
          </template>
        </AccordionTrigger>
        <AccordionContent class="mt-2">
          <p class="text-sm text-gray-cc">
            {{ content }}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
