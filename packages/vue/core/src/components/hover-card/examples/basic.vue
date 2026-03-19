<script setup lang="ts">
import { Button } from '../../button'
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger } from '../index'
</script>

<template>
  <HoverCard :positioning="{ placement: 'top' }">
    <HoverCardTrigger as-child>
      <Button>
        Hover Card
      </Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <HoverCardArrow />
      <div class="text-sm">
        content
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
