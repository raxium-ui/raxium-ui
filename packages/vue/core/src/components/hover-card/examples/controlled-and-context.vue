<script setup lang="ts">
import { HoverCardContext } from '@ark-ui/vue/hover-card'
import { ref } from 'vue'
import { Button } from '../../button'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from '../index'

const open = ref(false)
</script>

<template>
  <div class="w-full flex items-center gap-6">
    <Button @click="open = !open">
      Toggle open: {{ open }}
    </Button>

    <HoverCard
      v-model:open="open"
      :positioning="{ placement: 'top' }"
    >
      <HoverCardTrigger as-child>
        <Button variant="outline">
          Controlled hover-card
        </Button>
      </HoverCardTrigger>

      <HoverCardContent>
        <HoverCardArrow />
        <HoverCardContext v-slot="ctx">
          <div class="flex flex-col gap-1">
            <div class="text-sm">
              open: {{ ctx.open }}
            </div>
            <div class="text-xs opacity-75">
              Use HoverCardContext to access the API.
            </div>
          </div>
        </HoverCardContext>
      </HoverCardContent>
    </HoverCard>
  </div>
</template>
