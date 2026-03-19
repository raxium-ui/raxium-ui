<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Button } from '../../button'
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger } from '../index'

const content = fakerEN.lorem.sentences(2)
</script>

<template>
  <HoverCard :positioning="{ placement: 'bottom' }">
    <HoverCardTrigger as-child>
      <Button variant="outline">
        Custom UI
      </Button>
    </HoverCardTrigger>

    <HoverCardContent
      :ui="{
        content: 'border-rz-green',
        inner: 'bg-h00 text-hff dark:bg-h00 dark:text-hff',
      }"
    >
      <HoverCardArrow
        class="[--arrow-background:var(--color-rz-green)] [--arrow-border:var(--color-h00)]"
        :theme="{ size: 'lg' }"
      />
      <div class="flex flex-col gap-2">
        <div class="text-sm font-medium">
          Title
        </div>
        <div class="text-sm opacity-80">
          {{ content }}
        </div>
        <div class="flex items-center gap-2">
          <Button>
            Action
          </Button>
          <Button variant="text">
            Cancel
          </Button>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
