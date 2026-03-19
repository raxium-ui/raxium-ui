<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { Button } from '../../button'
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-6">
    <HoverCard
      v-for="size in THEME_SIZE"
      :key="size"
      :theme="{ size }"
      :positioning="{ placement: 'top' }"
    >
      <HoverCardTrigger as-child>
        <Button variant="outline">
          {{ size }}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        {{ size }} content
      </HoverCardContent>
    </HoverCard>

    <HoverCard
      :theme="{ bordered: false }"
      :positioning="{ placement: 'top' }"
    >
      <HoverCardTrigger as-child>
        <Button variant="outline">
          no border
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        bordered=false
      </HoverCardContent>
    </HoverCard>

    <HoverCard
      :theme="{ surface: 'dark' }"
      :positioning="{ placement: 'top' }"
    >
      <HoverCardTrigger as-child>
        <Button variant="outline">
          dark skin
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        surface=dark
      </HoverCardContent>
    </HoverCard>
  </div>
</template>
