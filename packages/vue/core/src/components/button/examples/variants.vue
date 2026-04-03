<script lang="ts" setup>
import { Icon } from '../../icon'
import { Button } from '../index'

const variants = ['solid', 'outlined', 'filled', 'text', 'link'] as const
const colors = ['primary', 'default', 'danger', 'warning', 'info'] as const
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div v-for="variant in variants" :key="variant" class="flex items-center gap-4">
      <span class="w-20 shrink-0 text-sm opacity-60">{{ variant }}</span>
      <Button
        v-for="color in colors"
        :key="color"
        :variant="variant"
        :color="color"
      >
        {{ color }}
      </Button>
    </div>

    <div class="flex items-center gap-4">
      <span class="w-20 shrink-0 text-sm opacity-60">icon</span>
      <Button
        v-for="color in colors"
        :key="color"
        variant="icon"
        :color="color"
      >
        <Icon icon="lucide:plus" />
      </Button>
    </div>
  </div>
</template>
