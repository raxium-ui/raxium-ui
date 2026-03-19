<script lang="ts" generic="T" setup>
import type { ClassNameValue } from 'tailwind-merge'
import type { VirtualGridProps } from '.'
import { VirtualRoot } from '.'
import VirtualGridImpl from './VirtualGridImpl.vue'

const props = defineProps<
  VirtualGridProps<T> & {
    ui?: {
      viewport?: {
        class?: ClassNameValue
      }
      scroll?: {
        class?: ClassNameValue
      }
    }
  }
>()
defineSlots<{ default: () => any }>()
</script>

<template>
  <VirtualRoot>
    <VirtualGridImpl v-bind="{ ...props, ...$attrs as any }">
      <slot />
    </VirtualGridImpl>
  </VirtualRoot>
</template>
