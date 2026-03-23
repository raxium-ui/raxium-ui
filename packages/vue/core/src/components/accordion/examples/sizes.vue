<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../index'

const content = fakerEN.lorem.sentences(4)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Accordion
      id="accordion-sizes-xs"
      class="w-full flex flex-col gap-2"
      collapsible
      :theme="{ size: 'xs' }"
    >
      <AccordionItem value="x">
        <AccordionTrigger>
          <div class="text-hff">
            XS
          </div>
        </AccordionTrigger>
        <AccordionContent class="mt-2">
          <p class="text-sm text-hcc">
            {{ content }}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <Accordion
      id="accordion-sizes-sm"
      class="w-full flex flex-col gap-2"
      collapsible
      :theme="{ size: 'sm' }"
    >
      <AccordionItem value="s">
        <AccordionTrigger>
          <div class="text-hff">
            Small
          </div>
        </AccordionTrigger>
        <AccordionContent class="mt-2">
          <p class="text-sm text-hcc">
            {{ content }}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <Accordion
      id="accordion-sizes-base"
      class="w-full flex flex-col gap-2"
      collapsible
      :theme="{ size: 'base' }"
    >
      <AccordionItem value="b">
        <AccordionTrigger>
          <div class="text-hff">
            Base
          </div>
        </AccordionTrigger>
        <AccordionContent class="mt-2">
          <p class="text-sm text-hcc">
            {{ content }}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <Accordion
      id="accordion-sizes-lg"
      class="w-full flex flex-col gap-2"
      collapsible
      :theme="{ size: 'lg' }"
    >
      <AccordionItem value="l">
        <AccordionTrigger>
          <div class="text-hff">
            Large
          </div>
        </AccordionTrigger>
        <AccordionContent class="mt-2">
          <p class="text-sm text-hcc">
            {{ content }}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
