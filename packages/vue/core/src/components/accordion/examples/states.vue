<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../index'

const content = fakerEN.lorem.sentences(6)
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <Accordion
      id="accordion-states-default-open"
      class="w-full flex flex-col gap-2"
      collapsible
      :default-value="['item-1']"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div class="text-sm text-hff">
            Default open (section 1)
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
    </Accordion>

    <Accordion
      id="accordion-states-multiple"
      class="w-full flex flex-col gap-2"
      collapsible
      multiple
      :default-value="['a', 'b']"
    >
      <AccordionItem value="a">
        <AccordionTrigger>
          <div class="text-sm text-hff">
            Multiple: A (default open)
          </div>
        </AccordionTrigger>
        <AccordionContent class="mt-2">
          <p class="text-sm text-hcc">
            {{ content }}
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>
          <div class="text-sm text-hff">
            Multiple: B (default open)
          </div>
        </AccordionTrigger>
        <AccordionContent class="mt-2">
          <p class="text-sm text-hcc">
            {{ content }}
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>
          <div class="text-sm text-hff">
            Multiple: C
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
      id="accordion-states-disabled"
      class="w-full flex flex-col gap-2"
      collapsible
    >
      <AccordionItem value="open">
        <AccordionTrigger>
          <div class="text-sm text-hff">
            Expandable
          </div>
        </AccordionTrigger>
        <AccordionContent class="mt-2">
          <p class="text-sm text-hcc">
            {{ content }}
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="locked"
        disabled
      >
        <AccordionTrigger>
          <div class="text-sm text-hff">
            Disabled (cannot toggle)
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
      id="accordion-states-collapsible"
      class="w-full flex flex-col gap-2"
      collapsible
      :default-value="['only']"
    >
      <AccordionItem value="only">
        <AccordionTrigger>
          <div class="text-sm text-hff">
            Collapsible: all panels can close
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
