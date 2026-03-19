<script setup lang="ts">
import { Button } from '../../button'
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-6">
    <HoverCard :open-delay="0" :close-delay="0" :positioning="{ placement: 'top' }">
      <HoverCardTrigger as-child>
        <Button variant="outline">
          No delay (top)
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        openDelay=0 closeDelay=0
      </HoverCardContent>
    </HoverCard>

    <HoverCard :open-delay="800" :close-delay="300" :positioning="{ placement: 'bottom-start' }">
      <HoverCardTrigger as-child>
        <Button variant="outline">
          Delayed (bottom-start)
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        openDelay=800 closeDelay=300
      </HoverCardContent>
    </HoverCard>

    <HoverCard :positioning="{ placement: 'right' }" unmount-on-exit lazy-mount>
      <HoverCardTrigger as-child>
        <Button variant="outline">
          Lazy mount + unmount
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        mounted only when opened
      </HoverCardContent>
    </HoverCard>
  </div>
</template>
